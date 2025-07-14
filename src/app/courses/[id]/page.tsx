"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Typography, Collapse, Menu, Button, List, Input, Form, message } from "antd";
import mockCourses from "../../../api/mockCourses";
import { LeftOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const { Title } = Typography;

// Mock comments data (in real app, fetch from API)
const mockComments: Record<number, { user: string; content: string; createdAt: string }[]> = {
  1: [
    { user: "Nguyễn Văn A", content: "Bài giảng rất dễ hiểu!", createdAt: "2024-06-01 10:00" },
    { user: "Lê Thị B", content: "Cảm ơn cô giáo!", createdAt: "2024-06-01 11:00" },
  ],
};

export default function CourseLessonPage() {
  const videoIframeRef = useRef<HTMLIFrameElement>(null);
  const { id } = useParams();
  const router = useRouter();
  const course = mockCourses.find((c) => c.id === Number(id));
  const sections = course?.sections || [];
  // Flatten all lessons for initial selection
  const allLessons = sections.flatMap(s => s.lessons);
  const [selectedLessonId, setSelectedLessonId] = useState<number>(allLessons[0]?.id || 1);
  const selectedLesson = allLessons.find((l) => l.id === selectedLessonId);
  // Mock: Đánh dấu hoàn thành bài học (localStorage hoặc state)
  const [completed, setCompleted] = useState<number[]>([]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(`completed_lessons_course_${id}`);
      setCompleted(data ? JSON.parse(data) : []);
    }
  }, [id]);
  function markCompleted(lessonId: number) {
    if (!completed.includes(lessonId)) {
      const updated = [...completed, lessonId];
      setCompleted(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem(`completed_lessons_course_${id}`, JSON.stringify(updated));
      }
    }
  }
  React.useEffect(() => {
    if (selectedLessonId) markCompleted(selectedLessonId);
    // eslint-disable-next-line
  }, [selectedLessonId]);

  if (!course) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <Title level={3} type="danger">Không tìm thấy khoá học</Title>
        <Button type="primary" onClick={() => router.push("/courses")}>Quay lại danh sách khoá học</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 min-h-[70vh]">
      {/* Sidebar: Section & Lesson List */}
      <aside className="w-full md:w-1/3 lg:w-1/4 bg-white rounded-xl shadow p-4 mb-6 md:mb-0 overflow-y-auto max-h-[80vh]">
        <Title level={4} className="mb-4 text-blue-600">Nội dung khoá học</Title>
        <Collapse
          accordion
          defaultActiveKey={sections[0]?.id}
          className="bg-white"
          expandIconPosition="end"
          items={sections.map(section => {
            const completedCount = section.lessons.filter(l => completed.includes(l.id)).length;
            const totalDuration = section.lessons.reduce((sum, l) => {
              const [min, sec] = l.duration.split(":").map(Number);
              return sum + min * 60 + sec;
            }, 0);
            const durationStr = `${Math.floor(totalDuration/60)}:${(totalDuration%60).toString().padStart(2, '0')}`;
            return {
              key: section.id,
              label: (
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-base">{section.title}</span>
                  <span className="text-xs text-gray-500">{completedCount}/{section.lessons.length} | {durationStr}</span>
                </div>
              ),
              children: (
                <Menu
                  mode="inline"
                  selectedKeys={[String(selectedLessonId)]}
                  onClick={({ key }) => setSelectedLessonId(Number(key))}
                  className="border-0 bg-transparent max-h-80 overflow-y-auto min-w-[260px]"
                  items={section.lessons.map(lesson => ({
                    key: lesson.id,
                    className: `!rounded !mb-2 !py-3 !px-4 !flex items-center justify-between w-full whitespace-normal hover:bg-blue-50 ${selectedLessonId === lesson.id ? 'bg-blue-100 !text-blue-700' : ''}`,
                    style: { whiteSpace: 'normal', wordBreak: 'break-word', width: '100%', minHeight: 56, overflow: 'hidden' },
                    label: (
                      <>
                        <span className="flex-1 block text-left text-base font-semibold break-words pr-2">
                          {lesson.title}
                        </span>
                        <span className="flex flex-row items-center flex-shrink-0 pl-2 gap-2">
                          <span className="text-sm text-gray-400">{lesson.duration}</span>
                          {completed.includes(lesson.id) && <span className="text-green-500 text-lg">✔</span>}
                        </span>
                      </>
                    )
                  }))}
                />
              )
            };
          })}
        />
        <Button
          icon={<LeftOutlined />}
          className="mt-6 w-full"
          onClick={() => router.push("/courses")}
        >
          Quay lại khoá học
        </Button>
      </aside>

      {/* Main: Video Player */}
      <main className="flex-1 bg-white rounded-xl shadow p-6 flex flex-col items-center">
        <Title level={3} className="mb-4 text-blue-700 text-center w-full">
          {selectedLesson?.title || "Chọn bài học"}
        </Title>
        {selectedLesson?.videoUrl ? (
          <div className="w-full flex justify-center">
            <div className="aspect-video w-full max-w-2xl rounded-xl overflow-hidden shadow-lg">
              <iframe
                ref={videoIframeRef}
                src={selectedLesson.videoUrl}
                title={selectedLesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full min-h-[300px] bg-black"
              />
            </div>
          </div>
        ) : (
          <div className="text-gray-500 text-lg mt-8">Chưa có video cho bài học này.</div>
        )}

        {/* Notes & Comments Section */}
        {selectedLesson && (
          <div className="w-full max-w-2xl mt-8">
            {/* Notes Button (show input on click) */}
            <LessonNoteButton lessonId={selectedLesson.id} videoIframeRef={videoIframeRef} />
            {/* Comments */}
            <div className="mt-8">
              <Title level={4} className="mb-2 text-blue-600">Bình luận</Title>
              <LessonComments lessonId={selectedLesson.id} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Component: Show a button, open note input on click, show list of notes
function LessonNoteButton({ lessonId, videoIframeRef }: { lessonId: number, videoIframeRef: React.RefObject<HTMLIFrameElement | null> }) {
  const [show, setShow] = React.useState(false);
  const [notes, setNotes] = React.useState<{ content: string; time: string }[]>([]);
  const [editorValue, setEditorValue] = React.useState<string | undefined>("");
  const [timestamp, setTimestamp] = React.useState("00:00");
  const [currentTime, setCurrentTime] = React.useState("00:00");
  const [showNotes, setShowNotes] = React.useState(false);
  const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout | null>(null);
  // Helper to format seconds to mm:ss
  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  // Poll YouTube iframe for current time every second
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (typeof event.data === "object" && event.data?.event === "infoDelivery" && event.data.info?.currentTime !== undefined) {
        setCurrentTime(formatTime(Math.floor(event.data.info.currentTime)));
      }
    }
    window.addEventListener("message", handleMessage);
    // Setup polling
    if (!show && videoIframeRef && videoIframeRef.current) {
      // Only poll when note input is closed
      const poll = setInterval(() => {
        videoIframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: "listening", id: 1 }),
          "*"
        );
        videoIframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "getCurrentTime", id: 1 }),
          "*"
        );
      }, 1000);
      setIntervalId(poll);
    }
    return () => {
      window.removeEventListener("message", handleMessage);
      if (intervalId) clearInterval(intervalId);
    };
    // eslint-disable-next-line
  }, [show]);

  // When opening note input, set timestamp to current video time
  function handleOpen() {
    setTimestamp(currentTime);
    setShow(true);
  }

  function handleSave() {
    const plain = (editorValue || "")
      .replace(/[#_*`>\-\s\n]+/g, "")
      .replace(/<[^>]+>/g, "")
      .replace(/\u200B/g, "")
      .trim();
    if (!plain) {
      message.warning("Vui lòng nhập nội dung ghi chú");
      return;
    }
    const newNote = { content: editorValue as string, time: timestamp };
    const updated = [newNote, ...notes];
    setNotes(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`lesson_notes_${lessonId}`, JSON.stringify(updated));
    }
    setEditorValue("");
    setShow(false);
    message.success("Đã tạo ghi chú!");
  }

  function handleCancel() {
    setEditorValue("");
    setShow(false);
  }

  if (typeof window === 'undefined') return null;

  return (
    <div className="mb-8">
      <div className="flex justify-end mb-4">
        {!show && (
          <Button icon={<PlusOutlined />} onClick={handleOpen}>
            Thêm ghi chú tại {currentTime}
          </Button>
        )}
      </div>
      {show && (
        <div className="w-full max-w-xl mx-auto bg-white p-4 rounded shadow">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-lg">Thêm ghi chú tại</span>
            <span className="bg-orange-500 text-white px-2 py-1 rounded text-base font-bold">{timestamp}</span>
          </div>
          <div className="mb-2" data-color-mode="light">
            <MDEditor
              value={editorValue}
              onChange={setEditorValue}
              height={200}
              preview="edit"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button onClick={handleCancel}>Huỷ bỏ</Button>
            <Button type="primary" onClick={handleSave}>Tạo ghi chú</Button>
          </div>
        </div>
      )}
      {/* Toggle notes list */}
      <div className="mt-6">
        <Button type="default" onClick={() => setShowNotes(v => !v)}>
          {showNotes ? 'Ẩn ghi chú đã tạo' : 'Xem ghi chú đã tạo'}
        </Button>
        {showNotes && notes.length > 0 && (
          <div className="mt-4">
            <div className="font-semibold mb-2 text-blue-600">Ghi chú đã tạo</div>
            <List
              dataSource={notes}
              renderItem={item => (
                <List.Item className="flex flex-col items-start">
                  <span className="text-xs text-orange-600 font-bold mb-1">Tại {item.time}</span>
                  <div className="w-full bg-white rounded p-3 shadow">
                    {item.content && item.content.trim() ? (
                      <MDEditor value={item.content}  preview="preview" hideToolbar style={{ background: 'white' }} />
                    ) : (
                      <span className="text-gray-400 italic">(Không có nội dung)</span>
                    )}
                  </div>
                </List.Item>
              )}
              locale={{ emptyText: "Chưa có ghi chú nào." }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Component: Comments for a lesson (mock, local state)
function LessonComments({ lessonId }: { lessonId: number }) {
  const [comments, setComments] = React.useState(() => mockComments[lessonId] || []);
  const [form] = Form.useForm();
  function handleFinish(values: { content: string }) {
    const newComment = {
      user: "Bạn",
      content: values.content,
      createdAt: new Date().toLocaleString("vi-VN"),
    };
    setComments(prev => [newComment, ...prev]);
    form.resetFields();
    message.success("Đã gửi bình luận!");
  }
  return (
    <div>
      <Form form={form} onFinish={handleFinish} className="mb-4">
        <Form.Item name="content" rules={[{ required: true, message: "Nhập nội dung bình luận" }]}
          className="mb-2">
          <Input.TextArea rows={2} placeholder="Viết bình luận..." />
        </Form.Item>
        <Form.Item className="mb-0">
          <Button type="primary" htmlType="submit">Gửi bình luận</Button>
        </Form.Item>
      </Form>
      <List
        dataSource={comments}
        renderItem={item => (
          <List.Item>
            <div className="w-full">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-blue-700">{item.user}</span>
                <span className="text-xs text-gray-400">{item.createdAt}</span>
              </div>
              <div className="text-gray-800">{item.content}</div>
            </div>
          </List.Item>
        )}
        locale={{ emptyText: "Chưa có bình luận nào." }}
      />
    </div>
  );
} 
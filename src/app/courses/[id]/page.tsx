"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Typography, Collapse, Menu, Button } from "antd";
import mockCourses from "../../../api/mockCourses";
import { LeftOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function CourseLessonPage() {
  const { id } = useParams();
  const router = useRouter();
  const course = mockCourses.find((c) => c.id === Number(id));
  const sections = course?.sections || [];
  // Flatten all lessons for initial selection
  const allLessons = sections.flatMap(s => s.lessons);
  const [selectedLessonId, setSelectedLessonId] = useState<number>(allLessons[0]?.id || 1);
  const selectedLesson = allLessons.find((l) => l.id === selectedLessonId);
  // Mock: Đánh dấu hoàn thành bài học (localStorage hoặc state)
  const [completed, setCompleted] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(`completed_lessons_course_${id}`);
      return data ? JSON.parse(data) : [];
    }
    return [];
  });
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
        >
          {sections.map(section => {
            const completedCount = section.lessons.filter(l => completed.includes(l.id)).length;
            const totalDuration = section.lessons.reduce((sum, l) => {
              const [min, sec] = l.duration.split(":").map(Number);
              return sum + min * 60 + sec;
            }, 0);
            const durationStr = `${Math.floor(totalDuration/60)}:${(totalDuration%60).toString().padStart(2, '0')}`;
            return (
              <Collapse.Panel
                header={
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-base">{section.title}</span>
                    <span className="text-xs text-gray-500">{completedCount}/{section.lessons.length} | {durationStr}</span>
                  </div>
                }
                key={section.id}
              >
                <Menu
                  mode="inline"
                  selectedKeys={[String(selectedLessonId)]}
                  onClick={({ key }) => setSelectedLessonId(Number(key))}
                  className="border-0 bg-transparent max-h-80 overflow-y-auto min-w-[260px]"
                >
                  {section.lessons.map(lesson => (
                    <Menu.Item
                      key={lesson.id}
                      className={`!rounded !mb-2 !py-3 !px-4 !flex items-center justify-between w-full whitespace-normal hover:bg-blue-50 ${selectedLessonId === lesson.id ? 'bg-blue-100 !text-blue-700' : ''}`}
                      style={{ whiteSpace: 'normal', wordBreak: 'break-word', width: '100%', minHeight: 56, overflow: 'hidden' }}
                    >
                      <span className="flex-1 block text-left text-base font-semibold break-words pr-2">
                        {lesson.title}
                      </span>
                      <span className="flex flex-row items-center flex-shrink-0 pl-2 gap-2">
                        <span className="text-sm text-gray-400">{lesson.duration}</span>
                        {completed.includes(lesson.id) && <span className="text-green-500 text-lg">✔</span>}
                      </span>
                    </Menu.Item>
                  ))}
                </Menu>
              </Collapse.Panel>
            );
          })}
        </Collapse>
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
      </main>
    </div>
  );
} 
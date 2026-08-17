"use client";

import type { Topic } from "@/types/practice";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import css from "./TopicBar.module.css";

type TopicBarProps = {
  topics: Topic[];
  topicId: string;
  taskCount: number;
  maxCount: number;
  disabled: boolean;
  onTopicChange: (id: string) => void;
  onTaskCountChange: (count: number) => void;
  onStart: () => void;
  onBack: () => void;
};

export function TopicBar({
  topics,
  topicId,
  taskCount,
  maxCount,
  disabled,
  onTopicChange,
  onTaskCountChange,
  onStart,
  onBack,
}: TopicBarProps) {
  return (
    <header className={css.header}>
      <div className={css.row}>
        <BackButton onClick={onBack} />
        <label className={css.label}>
          <span className={css.fixed}>Обери тему:</span>
          <Select
            instanceId="practice-topic"
            value={topicId}
            disabled={disabled}
            onChange={onTopicChange}
            wide
            options={topics.map((topic) => ({
              value: topic.id,
              label: `${topic.number}. ${topic.title}`,
            }))}
          />
        </label>
      </div>

      <div className={css.toolbar}>
        <span>Пройти</span>
        <Select
          instanceId="practice-count"
          value={String(taskCount)}
          disabled={disabled}
          onChange={(value) => onTaskCountChange(Number(value))}
          aria-label="Кількість завдань"
          narrow
          options={Array.from({ length: maxCount }, (_, index) => ({
            value: String(index + 1),
            label: String(index + 1),
          }))}
        />
        <span>завдань</span>
        <Button variant="start" onClick={onStart} disabled={disabled}>
          Старт
        </Button>
      </div>
    </header>
  );
}

"use client";

import type { Topic } from "@/types/practice";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { Timer } from "@/components/nmt/Timer";
import { clsx } from "clsx";
import css from "./TopicBar.module.css";

type TopicBarProps = {
  topics: Topic[];
  topicId: string;
  taskTotal: number;
  disabled: boolean;
  inTest: boolean;
  isUltimate: boolean;
  endsAt: number;
  compact?: boolean;
  onTopicChange: (id: string) => void;
  onStartFull: () => void;
  onStartUltimate: () => void;
  onAbort: () => void;
  onExpire: () => void;
};

export function TopicBar({
  topics,
  topicId,
  taskTotal,
  disabled,
  inTest,
  isUltimate,
  endsAt,
  compact,
  onTopicChange,
  onStartFull,
  onStartUltimate,
  onAbort,
  onExpire,
}: TopicBarProps) {
  return (
    <header className={clsx(css.header, compact && css.compact)}>
      <div className={css.row}>
        <BackButton href="/" />
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

      {inTest ? (
        <div className={css.sessionBar} aria-label="Режим тестування">
          <div className={css.modeCluster}>
            <span className={clsx(css.modeBadge, isUltimate ? css.modeUltimate : css.modeNormal)}>
              {isUltimate ? "Ultimate" : "Звичайний режим"}
            </span>
            {isUltimate ? <Timer endsAt={endsAt} onExpire={onExpire} /> : null}
          </div>
          <Button className={css.abort} onClick={onAbort}>
            Завершити тестування
          </Button>
        </div>
      ) : (
        <div className={css.toolbar}>
          <span>{taskTotal} завдань</span>
          <Button variant="start" onClick={onStartFull} disabled={disabled}>
            Звичайний
          </Button>
          <Button onClick={onStartUltimate} disabled={disabled}>
            Ultimate
          </Button>
        </div>
      )}
    </header>
  );
}

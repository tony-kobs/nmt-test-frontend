import { clsx } from "clsx";
import { MdBarChart, MdSchool, MdTrendingDown, MdTrendingFlat, MdTrendingUp } from "react-icons/md";
import type { ScoreTrend } from "@/helpers/hubStats";
import type { TestResult, WeakTopic } from "@/types/result";
import css from "./HubStats.module.css";

const TREND_CONFIG: Record<ScoreTrend, { Icon: typeof MdTrendingUp; label: string; className: string }> = {
  up: { Icon: MdTrendingUp, label: "Результат покращився", className: css.trendUp },
  down: { Icon: MdTrendingDown, label: "Результат погіршився", className: css.trendDown },
  same: { Icon: MdTrendingFlat, label: "Результат без змін", className: css.trendSame },
};

function Donut({ percent, accent }: { percent: number | null; accent: "correct" | "score" }) {
  const value = percent ?? 0;
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div className={css.donutWrap}>
      <svg viewBox="0 0 64 64" className={clsx(css.donut, css[accent])} aria-hidden="true">
        <circle className={css.donutTrack} cx="32" cy="32" r={radius} />
        <circle
          className={css.donutValue}
          cx="32"
          cy="32"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className={css.donutPercent}>{percent === null ? "—" : `${percent}%`}</span>
    </div>
  );
}

export function HubStats({
  last,
  correctPercent,
  scorePercent,
  scoreTrend,
  weakTopic,
  weakTopicErrorPercent,
  hasFullTest,
  className,
}: {
  last?: TestResult;
  correctPercent: number | null;
  scorePercent: number | null;
  scoreTrend: ScoreTrend | null;
  weakTopic?: WeakTopic;
  weakTopicErrorPercent: number | null;
  hasFullTest: boolean;
  className?: string;
}) {
  const trend = scoreTrend ? TREND_CONFIG[scoreTrend] : null;

  return (
    <section className={clsx(css.grid, className)} aria-label="Статистика">
      <article className={css.card}>
        <Donut percent={correctPercent} accent="correct" />
        <p className={css.value}>
          {last ? `${last.correct} з ${last.correct + last.incorrect + last.skipped}` : "—"}
        </p>
        <p className={css.label}>Правильних</p>
      </article>

      <article className={css.card}>
        <Donut percent={scorePercent} accent="score" />
        <p className={css.value}>{last ? `${last.testScore} з ${last.maxScore}` : "—"}</p>
        <p className={css.label}>
          Останній тест
          {trend ? (
            <span className={clsx(css.trend, trend.className)}>
              <trend.Icon aria-hidden="true" />
              <span>{trend.label}</span>
            </span>
          ) : null}
        </p>
      </article>

      <article className={css.card}>
        <MdBarChart className={clsx(css.icon, css.iconRating)} aria-hidden="true" />
        <p className={css.value}>{last?.rating ? `${last.rating} з 200` : "—"}</p>
        <p className={css.label}>
          Рейтинг
          {!last?.rating ? (
            <span className={css.hint}>Рейтинг 100–200 з’явиться після повного НМТ</span>
          ) : null}
        </p>
      </article>

      <article className={css.card}>
        <MdSchool className={clsx(css.icon, css.iconWeakTopic)} aria-hidden="true" />
        <p className={css.value}>
          {hasFullTest && weakTopic ? `${weakTopic.label}` : "—"}
        </p>
        <p className={css.label}>
          Слабка тема
          {hasFullTest && weakTopic ? (
            <span className={css.hint}>Помилки: {weakTopicErrorPercent}%</span>
          ) : hasFullTest ? (
            <span className={css.hint}>Помилок у темах поки немає</span>
          ) : (
            <span className={css.hint}>З’явиться після повного НМТ</span>
          )}
        </p>
      </article>
    </section>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as yup from "yup";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/Button";
import { PageLayout } from "@/components/PageLayout";
import { Select } from "@/components/Select";
import { persistAndGo } from "@/helpers/navigation";
import { createSession, generatePracticeTest, remainingPoolSize } from "@/helpers/testGenerator";
import { useAppDispatch } from "@/redux/hooks";
import { setSession } from "@/redux/session/slice";
import { CATEGORY_LABELS, type CategoryId } from "@/types/question";
import type { PracticeOptions } from "@/types/test";
import css from "./PracticeSetup.module.css";

const schema = yup.object({
  category: yup.string().required(),
  difficulty: yup.string().required(),
  count: yup.number().oneOf([10, 20, 30]).required(),
});

export function PracticeSetup() {
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const preset = params.get("category");
  const initialCategory: PracticeOptions["category"] =
    preset && preset in CATEGORY_LABELS ? (preset as CategoryId) : "all";

  const formik = useFormik({
    initialValues: {
      category: initialCategory,
      difficulty: "any" as PracticeOptions["difficulty"],
      count: 10 as PracticeOptions["count"],
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: async (values) => {
      const questions = generatePracticeTest({
        category: values.category as PracticeOptions["category"],
        difficulty: values.difficulty,
        count: values.count,
      });
      dispatch(
        setSession(
          createSession("practice", questions, {
            category: values.category === "all" ? undefined : (values.category as CategoryId),
            difficulty: values.difficulty,
            endsAt: null,
          }),
        ),
      );
      toast.success("Тренування розпочато");
      await persistAndGo("/nmt/test");
    },
  });

  const available = remainingPoolSize(
    formik.values.category as PracticeOptions["category"],
    formik.values.difficulty,
  );

  return (
    <PageLayout as="form" onSubmit={formik.handleSubmit}>
      <header className={css.header}>
        <div className={css.row}>
          <BackButton href="/" />
          <label className={css.label}>
            <span className={css.fixed}>Обери тему:</span>
            <Select
              instanceId="practice-category"
              value={formik.values.category}
              onChange={(value) => formik.setFieldValue("category", value)}
              wide
              options={[
                { value: "all", label: "Усі теми" },
                ...(Object.keys(CATEGORY_LABELS) as CategoryId[]).map((id) => ({
                  value: id,
                  label: CATEGORY_LABELS[id],
                })),
              ]}
            />
          </label>
        </div>
        <div className={css.toolbar}>
          <span>Складність:</span>
          <Select
            instanceId="practice-difficulty"
            value={formik.values.difficulty}
            onChange={(value) => formik.setFieldValue("difficulty", value)}
            options={[
              { value: "any", label: "Будь-яка" },
              { value: "easy", label: "Легка" },
              { value: "medium", label: "Середня" },
              { value: "hard", label: "Складна" },
            ]}
          />
        </div>
        <div className={css.toolbar}>
          <span>Пройти</span>
          <Select
            instanceId="practice-setup-count"
            value={String(formik.values.count)}
            onChange={(value) => formik.setFieldValue("count", Number(value) as PracticeOptions["count"])}
            narrow
            options={[
              { value: "10", label: "10" },
              { value: "20", label: "20" },
              { value: "30", label: "30" },
            ]}
          />
          <span>завдань</span>
          <Button variant="start" type="submit">
            Старт
          </Button>
        </div>
      </header>

      <main className={css.main}>
        <h1 className={css.title}>Тренування</h1>
        <p className={css.lead}>
          У вибраному фільтрі зараз {available} завдань. Оберіть параметри і натисніть «Старт».
        </p>
      </main>
    </PageLayout>
  );
}

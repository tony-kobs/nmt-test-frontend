# НМТ математика — фронтенд

Інтерактивна практика та тренажер НМТ-2026 з математики.

## Технології

Стек зібрано за методикою GoIT (React-модуль Full Stack), адаптовано під Next.js App Router:

- **Next.js 15** + React 19 + TypeScript
- **Redux Toolkit** + **redux-persist** — глобальний стан і localStorage
- **Formik** + **Yup** — форми налаштування тренування
- **CSS Modules** — стилі поруч із компонентом (`Component.module.css`), як у курсі GoIT
- **clsx** — умовні класи модулів

Axios не підключено: бекенду ще немає. Коли з’явиться API, HTTP-клієнт піде в `src/services/`.

## Архітектура

```
src/
  app/              маршрути Next.js + globals.css + not-found.module.css
  components/
    Button/         Button.tsx + Button.module.css
    Select/
    PageLayout/
    BackButton/
    AppBar/
    practice/TopicBar/   кожен компонент у власній папці
    nmt/NmtHub/
  redux/
  hooks/
  helpers/
  constants/
  data/
  types/
```

Правила:

- `app/` лише збирає сторінки, логіка живе в `hooks/` і `redux/`
- стилі — CSS-модулі в тій самій папці, що й TSX
- компоненти не ходять у localStorage напряму
- сесія тесту, історія і тема зберігаються через redux-persist

## Запуск

```bash
npm install
npm run dev
```

Відкрийте http://localhost:3000

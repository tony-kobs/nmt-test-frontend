import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi";
import css from "./BackButton.module.css";

export function BackButton({
  href,
  onClick,
  label = "Назад",
}: {
  href?: string;
  onClick?: () => void;
  label?: string;
}) {
  const icon = <HiOutlineArrowLeft size={18} aria-hidden />;

  if (href) {
    return (
      <Link href={href} className={css.button} aria-label={label}>
        {icon}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={css.button} aria-label={label}>
      {icon}
    </button>
  );
}

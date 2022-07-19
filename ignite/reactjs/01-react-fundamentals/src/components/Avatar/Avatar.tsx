import styles from "./Avatar.module.css";

type AvatarProps = {
  src: string;
  hasBorder?: boolean;
};

export function Avatar({ hasBorder = true, src }: AvatarProps) {
  return (
    <img
      src={src}
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
    />
  );
}

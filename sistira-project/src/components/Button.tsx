import styles from "../styles/Button.module.css";

export default function Button({ content }: ButtonProps) {
	return (
		<div className="button">
			<button className={styles.button}>
				{content}
			</button>
		</div>
	);
};
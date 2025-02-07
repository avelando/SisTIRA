import styles from "@/styles/ReverseButton.module.css";

export default function Button({ content }: ButtonProps) {
	return (
		<div className="button">
			<button className={styles.button}>
				{content}
			</button>
		</div>
	);
};
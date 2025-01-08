export default function WelcomeMessage(): JSX.Element {
  return (
    <div className="welcomeMessage text-black bg-[#f9fafb] dark:bg-stone-700 dark:text-white">
      <p style={{ marginBottom: "2rem" }}>
        <strong>Welcome to Killers. </strong>
        <span>This is a pest service company to help you in making </span>
        <strong>disinfection, </strong>
        <strong>disinsection </strong>
        <span>and </span>
        <strong>deratization</strong> procedures.
      </p>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface VerifyResponse {
  valid: boolean;
}

interface MessageProps {
  t: ReturnType<typeof useTranslations>;
  onNavigateHome: () => void;
}

const ThankYou: React.FC = () => {
  const t = useTranslations("ThankYou");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const verifySession = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get("session_id");

      if (!sessionId) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/verify-checkout-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        if (!res.ok) throw new Error("Failed to verify session");

        const data: VerifyResponse = await res.json();
        setIsValid(data.valid);
      } catch (error) {
        console.error("Verification error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

  const navigateHome = (): void => {
    window.location.href = "/";
  };

  if (isLoading) {
    return <LoadingMessage />;
  }

  return isValid ? (
    <ValidSessionMessage t={t} onNavigateHome={navigateHome} />
  ) : (
    <InvalidSessionMessage t={t} onNavigateHome={navigateHome} />
  );
};

const LoadingMessage: React.FC = () => {
  const t = useTranslations("ThankYou");
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-lg text-gray-600 dark:text-gray-300">
        {t("loading")}
      </div>
    </div>
  );
};

const InvalidSessionMessage: React.FC<MessageProps> = ({
  t,
  onNavigateHome,
}) => (
  <MessageContainer>
    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
      {t("invalidSession")}
    </p>
    <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
      {t("noAccess")}
    </h1>
    <ActionButton label={t("returnHome")} onClick={onNavigateHome} />
  </MessageContainer>
);

const ValidSessionMessage: React.FC<MessageProps> = ({ t, onNavigateHome }) => (
  <MessageContainer>
    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
      {t("title")}
    </h1>
    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
      {t("message")}
    </p>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
      {t("details")}
    </p>
    <ActionButton label={t("returnHome")} onClick={onNavigateHome} />
  </MessageContainer>
);

const MessageContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div className="bg-white dark:bg-gray-500 rounded-lg shadow-lg p-8 text-center max-w-md">
      {children}
    </div>
  </div>
);

const ActionButton: React.FC<{ label: string; onClick: () => void }> = ({
  label,
  onClick,
}) => (
  <button
    className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none"
    onClick={onClick}
  >
    {label}
  </button>
);

export default ThankYou;

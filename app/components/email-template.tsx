import * as React from 'react';

interface EmailTemplateProps {
  verificationCode: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  verificationCode,
}) => (
  <div>
    <h1>Here is your verification code: {verificationCode}</h1>
    <p>Please note: This email is automated and not monitored for responses.</p>
  </div>
);

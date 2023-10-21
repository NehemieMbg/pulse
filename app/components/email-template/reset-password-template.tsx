import * as React from 'react';

interface EmailTemplateProps {
  resetCode: string;
}

export const ResetPasswordTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  resetCode,
}) => (
  <div>
    <h1>Here is your password reset code: {resetCode}</h1>
    <p>Please note: This email is automated and not monitored for responses.</p>
  </div>
);

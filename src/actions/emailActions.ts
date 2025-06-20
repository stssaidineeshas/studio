
'use server';

import AWS from 'aws-sdk';
import mimemessage from 'mimemessage';

interface MailData {
  email: string;
  subject: string;
  emailTemplate: string;
}

export async function sendMailAction(data: MailData): Promise<{ success: boolean; message: string }> {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION;
  const fromEmail = process.env.AWS_SES_FROM_EMAIL;

  if (!accessKeyId || !secretAccessKey || !region || !fromEmail) {
    console.error('AWS SES environment variables not fully configured.');
    return { success: false, message: 'Email server configuration error. Please contact support.' };
  }

  const ses = new AWS.SES({
    region: region,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  });

  const emailData = mimemessage.factory({
    contentType: 'multipart/mixed',
    body: [],
  });

  emailData.header('From', `Taxbandits API <${fromEmail}>`);
  emailData.header('To', data.email);
  emailData.header('Subject', data.subject);

  const htmlContent = mimemessage.factory({
    contentType: 'text/html;charset=utf-8', // Added charset
    body: data.emailTemplate,
  });

  emailData.body.push(htmlContent);

  const params = {
    RawMessage: {
      Data: emailData.toString(),
    },
  };

  try {
    await ses.sendRawEmail(params).promise();
    return { success: true, message: 'Email sent successfully.' };
  } catch (err: any) {
    console.error(`Failed to send email to ${data.email}:`, err);
    // Provide a more generic error message to the client
    return { success: false, message: `Failed to send email. Error: ${err.code || err.message || 'Unknown SES error'}` };
  }
}


'use server';

import type AWS from 'aws-sdk';
import { SES } from 'aws-sdk'; // Use specific import for SES

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

  const ses = new SES({ // Use SES directly
    region: region,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  });

  const params: AWS.SES.SendEmailRequest = {
    Source: `Taxbandits API <${fromEmail}>`,
    Destination: {
      ToAddresses: [data.email],
    },
    Message: {
      Subject: {
        Data: data.subject,
        Charset: 'UTF-8',
      },
      Body: {
        Html: {
          Data: data.emailTemplate,
          Charset: 'UTF-8',
        },
      },
    },
  };

  try {
    await ses.sendEmail(params).promise();
    return { success: true, message: 'Email sent successfully.' };
  } catch (err: any) {
    console.error(`Failed to send email to ${data.email}:`, err);
    return { success: false, message: `Failed to send email. Error: ${err.code || err.message || 'Unknown SES error'}` };
  }
}

import docusign from 'docusign-esign';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { signerEmail, signerName, documentBase64, documentName } = req.body;

  const apiClient = new docusign.ApiClient();
  apiClient.setBasePath('https://demo.docusign.net/restapi');
  apiClient.addDefaultHeader('Authorization', 'Bearer ' + process.env.DOCUSIGN_ACCESS_TOKEN);

  const envelopeDefinition = new docusign.EnvelopeDefinition();
  envelopeDefinition.emailSubject = 'Please sign this document';
  envelopeDefinition.documents = [
    {
      documentBase64,
      name: documentName,
      fileExtension: 'pdf',
      documentId: '1',
    },
  ];
  envelopeDefinition.recipients = {
    signers: [
      {
        email: signerEmail,
        name: signerName,
        recipientId: '1',
        routingOrder: '1',
        tabs: {
          signHereTabs: [
            {
              anchorString: '/sn1/',
              anchorYOffset: '10',
              anchorUnits: 'pixels',
              anchorXOffset: '20',
            },
          ],
        },
      },
    ],
  };
  envelopeDefinition.status = 'sent';

  const envelopesApi = new docusign.EnvelopesApi(apiClient);
  const results = await envelopesApi.createEnvelope(process.env.DOCUSIGN_ACCOUNT_ID, { envelopeDefinition });
  res.status(200).json(results);
}
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
    );
  }

  // Use the version ID for the sdxl-panoramic model
  const versionId = "76acc4075d0633dcb3823c1fed0419de21d42001b65c816c7b5b9beff30ec8cd";

  const prediction = await replicate.predictions.create({
    version: versionId,
    input: {
      prompt: req.body.prompt,
      // Add any other required input parameters for the new model here
    },
    // webhook here
  });

  if (prediction?.error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: prediction.error }));
    return;
  }

  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
}

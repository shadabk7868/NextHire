const fs = require("fs");
const pdfParse = require("pdf-parse");
const { groq } = require("../ai/groq");

const analyzeResume = async (req, res) => {
  try {
    const { resumeUrl, jobDescription } = req.body;

    if (!resumeUrl || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Resume URL and Job Description are required",
      });
    }

    // localhost url ko render url me convert karega
    const fixedUrl = resumeUrl.replace(
      "http://localhost:4000",
      "https://nexthire-i1hx.onrender.com"
    );

    // resume download
    const response = await fetch(fixedUrl);

    if (!response.ok) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // pdf buffer
    const buffer = Buffer.from(await response.arrayBuffer());

    // pdf text
    const pdf = await pdfParse(buffer);

    const resumeText = pdf.text;

    // Prompt
    const prompt = `
You are an ATS Resume Analyzer.

Compare the resume with the job description.

Job Description:
${jobDescription}

Resume:
${resumeText}

Return ONLY valid JSON.

{
  "score":90,
  "matchedSkills":["React","Node.js"],
  "missingSkills":["Docker"],
  "summary":"Good MERN Developer",
  "recommendation":"Shortlist"
}
`;

    // Groq
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    const result = completion.choices[0].message.content;

const cleanResult = result
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

res.status(200).json({
  success: true,
  data: JSON.parse(cleanResult),
});

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI Analysis Failed",
    });
  }
};

module.exports = {
  analyzeResume,
};
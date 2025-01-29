import OpenAI from 'openai';

const apiKey = "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";

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
});

export async function generateDateSuggestion(formData: any) {
  try {
    const prompt = `As an AI specialized in health analysis and life expectancy estimation, analyze the following user data and:
    1. Calculate an estimated life expectancy based on these health factors
    2. Suggest an optimal date for digital asset transfer (approximately 2-3 years before the estimated end date)
    3. Provide a detailed explanation of the factors that influenced this calculation
    4. Give him a suggestion of a date to transfer the digital assets in the following format:[DD/MM/YYYY]

    User Profile:
    - Age: ${formData.age}
    - Gender: ${formData.gender}
    - Marital Status: ${formData.maritalStatus}
    - Occupation: ${formData.occupation}
    
    Health Factors:
    - Chronic Diseases: ${formData.chronicDiseases}
    - Family History: ${formData.familyHistory}
    - Recent Surgeries: ${formData.recentSurgeries}
    - Current Medications: ${formData.medications}
    
    Lifestyle:
    - Smoking: ${formData.smoking}
    - Alcohol Consumption: ${formData.alcohol}
    - Drug Use: ${formData.drugs}
    - Physical Activity: ${formData.physicalActivity}
    - Diet: ${formData.diet}
    
    Health Metrics:
    - Height: ${formData.height}cm
    - Weight: ${formData.weight}kg
    - Blood Pressure: ${formData.bloodPressure}
    - Cholesterol: ${formData.cholesterol}
    
    Risk Factors:
    - Travel History: ${formData.travelHistory}
    - Extreme Sports: ${formData.extremeSports}
    - Stress Levels: ${formData.stress}

    Please provide your response in this format:
    Estimated Life Expectancy: [Year]
    Suggested Transfer Date: [Date]
    Explanation: [Detailed analysis of factors considered in maximum 3 sentences]`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
    });

    const response = completion.choices[0].message.content;
    if (!response) throw new Error('No response from OpenAI');
    return parseAIResponse(response);
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw error;
  }
}

function parseAIResponse(response: string) {
  const lines = response.split('\n');
  let date = '';
  let explanation = '';

  for (const line of lines) {
    if (line.toLowerCase().includes('suggested transfer date:')) {
      // Extraemos la fecha en formato DD/MM/YYYY
      const dateMatch = line.match(/\d{2}\/\d{2}\/\d{4}/);
      if (dateMatch) {
        date = dateMatch[0];
      }
    } else if (!line.toLowerCase().includes('estimated life expectancy:')) {
      explanation += line + '\n';
    }
  }

  // Convertimos la fecha de DD/MM/YYYY a objeto Date
  const [day, month, year] = date.split('/').map(Number);
  const suggestedDate = new Date(year, month - 1, day);

  return {
    suggestedDate,
    explanation: explanation.trim()
  };
} 
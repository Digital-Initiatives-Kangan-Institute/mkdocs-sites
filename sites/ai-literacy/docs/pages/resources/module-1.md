# AI Prompt Engineering & Capability Building

## Fundamentals of AI Prompting

A **prompt** is the text or question you give to an Artificial Intelligence (AI) model. It acts as the direct guide for the model's response; writing clear, specific prompts leads to higher-quality and more useful answers. Think of prompt engineering as giving instructions to a highly capable assistant.

AI models respond to several basic styles of prompts, each suited to different tasks:

1. **Question Prompts**
    * **Purpose**: Used to explain, inform, clarify, start conversations, or build understanding.
    * **Examples**:
        * *"What are the advantages of renewable energy?"*
        * *"Why is sleep important for learning?"*
        * *"How does 3D printing work?"*

2. **Instruction Prompts**
    * **Purpose**: Direct, action-oriented prompts that tell the AI exactly what to do.
    * **Examples**:
        * *"Summarise this article in 3 bullet points."*
        * *"Write a professional email to a new client."*
        * *"Generate a list of 5 blog post ideas about healthy eating."*

3. **Creative Prompts**
    * **Purpose**: Inspire original, imaginative, or narrative responses, encouraging storytelling, brainstorming, or artistic expression.
    * **Examples**:
        * *"Write a short story about a robot who learns to paint."*
        * *"Create a funny slogan for a coffee shop."*
        * *"Invent a new holiday and describe how people celebrate it."*

4. **Role-Based Prompts**
    * **Purpose**: Instruct the AI to adopt a specific persona, role, or professional perspective to tailor the tone, language, and situational context of the output.
    * **Examples**:
        * *"You are a teacher. Explain fractions to a 10-year-old."*
        * *"Act as a travel agent. Plan a 3-day trip to Tokyo."*
        * *"You are a recruiter. Review this resume and suggest improvements."*

---

## Adding Context and Constraints

To maximise the effectiveness of an AI response, prompts must move beyond vague queries by incorporating specific **context** (such as the target audience or background) and **constraints** (such as length limitations or format requirements).

### Comparative Examples: Vague vs. Specific Prompting

| Topic | Vague Prompt (Without Context/Constraints) | Specific Prompt (With Context & Constraints) | Key Parameters Added |
| :--- | :--- | :--- | :--- |
| **Photosynthesis** | *Explain photosynthesis.* | *Explain photosynthesis to a 10-year-old in under 100 words, using simple language and a fun analogy.* | **Context**: Audience is a 10-year-old. **Constraints**: Under 100 words, simple language, use of a fun analogy. |
| **Baking** | *Instructions on how to bake a chocolate cake.* | *Describe how to bake a chocolate cake for beginners using only 5 simple ingredients and clear step-by-step instructions.* | **Context**: Target audience is beginners. **Constraints**: Limit to 5 ingredients, require step-by-step format. |

---

## Advanced Prompting & Refinement

As you develop your capabilities, you will move from simple inputs to strategic, multi-turn interactions. Follow these **five core prompting techniques** to consistently generate professional outputs:

1. **Be Clear and Specific**: Do not leave details to chance. Specify your precise needs (e.g., *"Write a professional 3-sentence email to a client explaining that their order is delayed by two days."*).
2. **Assign a Role (Persona)**: Establish the perspective, tone, and domain expertise the AI should adopt right at the beginning of the prompt.
3. **Provide Context and Data**: Feed the AI the "raw ingredients" (supporting data, articles, background information, or internal guidelines) it needs to perform the task accurately.
4. **Define the Output Format**: Direct the structure of the response. Specify whether you want an email, a markdown table, a bulleted list, a technical report, or a summary slide layout.
5. **Iterate and Refine**: Recognise that a first prompt is rarely perfect. If the AI misses the mark, do not start a new session; instead, engage in **iterative prompting** by providing constructive "follow-up" feedback to guide the model toward the desired outcome.

### Hands-On Prompt Practice Template

When practicing or completing class activities, use this structured template to design, test, and improve your prompts:

```markdown
### 1. Planning Stage
*   **Role**: [Define who the AI is, e.g., "Retail Supervisor at a tech store"]
*   **Task**: [Define the objective, e.g., "Create a staff briefing document for a Saturday Flash Sale"]
*   **Background Information**: 
    """
    [Paste or describe the raw data or supervisor's notes here]
    """
*   **Specific Instructions**: [List action items, e.g., "1. Acknowledge staffing challenges in a professional tone. 2. Create a 2-column table with 'Task' and 'Priority Level'"]
*   **Tone**: [Specify, e.g., "Empathetic, professional, or motivational"]
*   **Output Format**: [Specify, e.g., "An internal email format"]

### 2. Testing & Improvement Log
*   **Draft Prompt 1 (Vague)**: [Your initial prompt]
*   **AI Output 1 Summary**: [Briefly summarise what the AI generated]
*   **Evaluation**: [What did the AI miss? Did it hallucinate or ignore constraints?]
*   **How I Improved It**: [Changes made to prompt parameters]

*   **Draft Prompt 2 (Refined)**: [Your improved prompt incorporating context/constraints]
*   **AI Output 2 Summary**: [The improved output]
```

### Prompting Limitations

While Generative AI is a powerful tool, it exhibits clear boundaries that require human judgment to manage:

*   **Knowledge Cutoff**: The model's training data has a temporal limit; it cannot access real-time events past this cutoff unless equipped with live search tools.
*   **Quality Dependence**: The output is directly tied to input quality; poor, vague prompts inevitably produce low-quality results ("garbage in, garbage out").
*   **Hallucination**: AI can confidently state incorrect or fabricated facts, dates, names, or citations.
*   **Bias Risks**: Models can mirror, amplify, or reinforce systemic biases present in their training datasets.
*   **Inconsistency**: Outputs can vary unpredictably, meaning the same prompt may generate different responses across sessions.

> **Human Oversight Rule**: AI tools are powerful assistants, but they require critical human judgment to verify factual outputs, apply contextual understanding, and make final decisions.


## Creative Problem-Solving & Prompt Ideation (The SCAMPER Framework)

### Overview & Origin
SCAMPER is a seven-question idea-generation checklist, built on Alex Osborn's 1953 brainstorming technique and developed into its current form by Bob Eberle in the 1970's.

### Using SCAMPER to Improve AI Prompts
Most people type one prompt, get an average answer and stop. SCAMPER gives you seven ways to change a prompt so you get a different answer. 

1. **Start with a plain prompt.** This is your baseline.
2. **Pick one SCAMPER question** and use it to change one part of the prompt: the audience, format, tone, task or rules.
3. **Run the new prompt** and compare it with the baseline.
4. **Change only one thing at a time.** You can then see which change improved the answer.

You don't have to use every letter or follow the order of the acronym.

The examples below all start from the same baseline prompt:
> *"Explain how the water cycle works."*

| Dimension | What it means for prompting | Improved prompt |
|---|---|---|
| **S – Substitute** | Swap one element, such as the audience, voice or analogy. | "Explain how the water cycle works to a 10-year-old, using a city bus network as the analogy." |
| **C – Combine** | Join two tasks or ideas in one prompt. | "Explain the water cycle in 150 words, then turn it into a four-line rhyme and a three-question quiz." |
| **A – Adapt** | Borrow a format or structure from somewhere else. | "Explain the water cycle in the format of a recipe, with ingredients, method steps and cooking time." |
| **M – Modify** | Change the size, emphasis or tone. | "Explain the water cycle in two sentences. Then rewrite it as a sports commentator calling a championship match." |
| **P – Put to another use** | Reuse the output for a different purpose. | "Explain the water cycle, then turn your explanation into a 60-second video script and a set of six flashcards." |
| **E – Eliminate** | Remove words, jargon or steps to force a fresh approach. | "Explain the water cycle without using the words 'evaporation', 'condensation' or 'precipitation'." |
| **R – Reverse** | Flip the order, the goal or the roles. | "Write an explanation of the water cycle that contains three deliberate mistakes, then give me an answer key." |

### SCAMPER Prompt Ideation Matrix
*Quick reference for students.*

| Strategy | Ask yourself | Prompt formula | Business practice scenario |
|---|---|---|---|
| **Substitute** | What can I swap? | "Rewrite [prompt], but replace [element] with [alternative]." | Rewrite a product announcement email for retail customers so it speaks to small-business owners instead. |
| **Combine** | What can I merge? | "Do [task A] and then [task B] in one response." | Summarise a customer survey and then draft three action items for the team. |
| **Adapt** | What can I borrow? | "Present [topic] in the style or structure of [other format]." | Present a quarterly sales report in the structure of a news broadcast, with headlines and a weather-style outlook. |
| **Modify** | What can I shrink, stretch or exaggerate? | "Give me [topic] in [word limit] words, then in [different tone]." | Write a 30-word elevator pitch for a new service, then a warm, friendly version for a website homepage. |
| **Put to another use** | Where else could this output go? | "Turn this answer into [new format] for [new audience]." | Turn a staff training guide into a customer FAQ page and a short social media post. |
| **Eliminate** | What can I remove? | "Do [task] without using [word, tool or step]." | Draft a persuasive sales email with no buzzwords or industry jargon. |
| **Reverse** | What if I flip it? | "Start from the end, or make the answer wrong on purpose, then fix it." | Ask for a deliberately bad customer complaint reply, then ask AI to explain what's wrong and rewrite it well. |

### Further reading on this topic
https://www.bitesizelearning.co.uk/resources/scamper-model-creativity 
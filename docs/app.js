/**
 * @typedef {Object} PromptSection
 * @property {string} title - The section title
 * @property {string} content - The section content
 */

/**
 * @typedef {Object} Sections
 * @property {PromptSection} goal - The goal section
 * @property {PromptSection} returnFormat - The return format section
 * @property {PromptSection} warnings - The warnings section
 * @property {PromptSection} contextDump - The context dump section
 * @property {PromptSection} styleAndTone - The style and tone section
 * @property {PromptSection} sampleOutput - The sample output section
 * @property {PromptSection} evaluationCriteria - The evaluation criteria section
 */

const SECTION_KEYS = {
  GOAL: 'goal',
  RETURN_FORMAT: 'returnFormat',
  WARNINGS: 'warnings',
  CONTEXT_DUMP: 'contextDump',
  STYLE_AND_TONE: 'styleAndTone',
  SAMPLE_OUTPUT: 'sampleOutput',
  EVALUATION_CRITERIA: 'evaluationCriteria',
};

/**
 * InputField component for rendering a textarea input.
 *
 * @param {Object} props - The component props
 * @param {string} props.id - The id for the textarea
 * @param {string} props.label - The label for the textarea
 * @param {string} props.value - The current value of the textarea
 * @param {function} props.onChange - The function to call on change
 * @param {string} props.placeholder - The placeholder text
 * @param {boolean} [props.isRequired=false] - Whether the field is required
 * @returns {JSX.Element} The InputField component
 */
function InputField({
  id,
  label,
  value,
  onChange,
  placeholder,
  isRequired = false,
}) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={isRequired}
      />
    </div>
  );
}

/**
 * A form component for building structured prompts.
 *
 * @returns {JSX.Element} The PromptBuilder component
 */
function PromptBuilder() {
  const [sections, setSections] = React.useState({
    [SECTION_KEYS.GOAL]: { title: 'Goal', content: '' },
    [SECTION_KEYS.RETURN_FORMAT]: { title: 'Return Format', content: '' },
    [SECTION_KEYS.WARNINGS]: { title: 'Warnings', content: '' },
    [SECTION_KEYS.CONTEXT_DUMP]: { title: 'Context Dump', content: '' },
    [SECTION_KEYS.STYLE_AND_TONE]: { title: 'Style and Tone', content: '' },
    [SECTION_KEYS.SAMPLE_OUTPUT]: { title: 'Sample Output', content: '' },
    [SECTION_KEYS.EVALUATION_CRITERIA]: {
      title: 'Evaluation Criteria',
      content: '',
    },
  });
  const [copyStatus, setCopyStatus] = React.useState('Copy');

  /**
   * Updates a section's content.
   *
   * @param {keyof Sections} sectionKey - The key of the section to update
   * @param {string} content - The new content
   */
  function updateSection(sectionKey, content) {
    setSections((prevSections) => ({
      ...prevSections,
      [sectionKey]: { ...prevSections[sectionKey], content },
    }));
  }

  /**
   * Generate the formatted prompt from all sections.
   *
   * @returns {string} The formatted prompt text
   */
  function getFormattedPrompt() {
    return Object.values(sections)
      .filter((section) => section.content.trim())
      .map((section) => `## ${section.title}\n${section.content}`)
      .join('\n\n');
  }

  /**
   * Copy the formatted prompt to clipboard.
   */
  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(getFormattedPrompt());
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy'), 2000);
    } catch (err) {
      setCopyStatus('Failed to copy');
      setTimeout(() => setCopyStatus('Copy'), 2000);
    }
  }

  const formattedPrompt = getFormattedPrompt();

  return (
    <div className="container">
      <header>
        <h1>Reasoning Prompt Builder</h1>
        <a href="https://github.com/MichaelCurrin/reasoning-prompt-builder">
          <img
            src="https://img.shields.io/static/v1?label=MichaelCurrin&amp;message=reasoning-prompt-builder&amp;color=blue&amp;labelColor=35495e&amp;logo=github"
            alt="MichaelCurrin - reasoning-prompt-builder repo badge"
            title="Go to MichaelCurrin - reasoning-prompt-builder repo on GitHub"
          />
        </a>
      </header>
      <p>
        A simple tool for creating structured LLM prompts for reasoning tasks.
        Such as using "Reasoning" or "Deep Think" modes or the{' '}
        <a
          href="https://openai.com/o1/"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenAI O1 Model
        </a>
        .
      </p>
      <p>
        This tool is based on the template titled "Anatomy of an o1 Prompt". See
        this{' '}
        <a href="https://www.linkedin.com/pulse/anatomy-01-prompt-enhanced-template-alex-covo-jslee/">
          blog post
        </a>
      </p>
      <p>
        {' '}
        For a more detailed prompt builder that uses more convenient inputs,
        visit the{' '}
        <a
          href="https://michaelcurrin.github.io/easy-prompt/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Easy Prompt
        </a>{' '}
        web app.
      </p>
      <div className="two-pane-layout">
        <div className="input-pane">
          <h2>Required Inputs</h2>
          <InputField
            id="section-goal"
            label="Goal *"
            value={sections[SECTION_KEYS.GOAL].content}
            onChange={(e) => updateSection(SECTION_KEYS.GOAL, e.target.value)}
            placeholder="e.g. Create a concise technical summary of the provided research paper, highlighting key findings and methodology"
            isRequired={true}
          />
          <InputField
            id="section-format"
            label="Return Format *"
            value={sections[SECTION_KEYS.RETURN_FORMAT].content}
            onChange={(e) =>
              updateSection(SECTION_KEYS.RETURN_FORMAT, e.target.value)
            }
            placeholder={"e.g. A bullet list. \ne.g. A short blog post. \ne.g. Return a JSON object with: title (string), key_findings (array of strings), methodology (string), and limitations (array of strings)."}
            isRequired={true}
          />
          <InputField
            id="section-warnings"
            label="Warnings *"
            value={sections[SECTION_KEYS.WARNINGS].content}
            onChange={(e) =>
              updateSection(SECTION_KEYS.WARNINGS, e.target.value)
            }
            placeholder="e.g. Maintain scientific accuracy. Do not speculate beyond the paper's content. Flag any statistical inconsistencies found."
            isRequired={false}
          />
          <h2>Optional Inputs</h2>
          <InputField
            id="section-context"
            label="Context Dump"
            value={sections[SECTION_KEYS.CONTEXT_DUMP].content}
            onChange={(e) =>
              updateSection(SECTION_KEYS.CONTEXT_DUMP, e.target.value)
            }
            placeholder="A few paragraphs of content such as background research or the content to transform with."
            isRequired={false}
          />
          <InputField
            id="section-style"
            label="Style and Tone"
            value={sections[SECTION_KEYS.STYLE_AND_TONE].content}
            onChange={(e) =>
              updateSection(SECTION_KEYS.STYLE_AND_TONE, e.target.value)
            }
            placeholder="e.g. Formal and academic. Use technical language appropriate for a professional audience."
            isRequired={false}
          />
          <InputField
            id="section-sample-output"
            label="Sample Output"
            value={sections[SECTION_KEYS.SAMPLE_OUTPUT].content}
            onChange={(e) =>
              updateSection(SECTION_KEYS.SAMPLE_OUTPUT, e.target.value)
            }
            placeholder="Paste your existing content here."
            isRequired={false}
          />
          <InputField
            id="section-evaluation-criteria"
            label="Evaluation Criteria"
            value={sections[SECTION_KEYS.EVALUATION_CRITERIA].content}
            onChange={(e) =>
              updateSection(SECTION_KEYS.EVALUATION_CRITERIA, e.target.value)
            }
            placeholder={'e.g.\n- Relevance to the topic \n- thoroughness in covering all points\n- accuracy of information\n- adherence to the specified format.'}
            isRequired={false}
          />
        </div>

        <div className="result-section">
          <h2>Result</h2>
          <div className="result-container">
            <button
              className="button copy-button"
              style={{ width: '100px' }}
              onClick={copyToClipboard}
            >
              {copyStatus} 📋
            </button>
            <div className="result">
              <pre>{formattedPrompt || ''}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return <PromptBuilder />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

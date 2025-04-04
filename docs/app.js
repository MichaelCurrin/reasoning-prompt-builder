/**
 * @typedef {Object} PromptSection
 * @property {string} title - The section title
 * @property {string} content - The section content
 */

/**
 * A form component for building structured prompts.
 *
 * @returns {JSX.Element} The PromptBuilder component
 */
const PromptBuilder = () => {
  const [sections, setSections] = React.useState([
    { title: 'Goal', content: '' },
    { title: 'Return Format', content: '' },
    { title: 'Warnings', content: '' },
    { title: 'Context Dump', content: '' },
  ]);
  const [copyStatus, setCopyStatus] = React.useState('Copy');

  /**
   * Updates a section's content and regenerates the preview.
   *
   * @param {number} index - The index of the section to update
   * @param {string} content - The new content
   */
  const updateSection = (index, content) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], content };
    setSections(newSections);
  };

  /**
   * Generates the formatted prompt from all sections.
   *
   * @returns {string} The formatted prompt text
   */
  const getFormattedPrompt = () => {
    return sections
      .filter((section) => section.content.trim())
      .map((section) => `## ${section.title}\n${section.content}`)
      .join('\n\n');
  };

  /**
   * Copies the formatted prompt to clipboard.
   */
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getFormattedPrompt());
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy'), 2000);
    } catch (err) {
      setCopyStatus('Failed to copy');
      setTimeout(() => setCopyStatus('Copy'), 2000);
    }
  };

  const formattedPrompt = getFormattedPrompt();

  return (
    <div className="container">
      <h1>Reasoning Prompt Builder</h1>
      <p>
        A simple tool for creating structured LLM prompts for reasoning tasks.
        Such as using "Reasoning" or "Deep Think" modes or the{' '}
        <a
          href="https://openai.com/o1/"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenAI O1 Model
        </a>.
      </p>
      <p>This tool is based on the template titled "Anatomy of an o1 Prompt".</p>
      <p>
        {' '}
        For a more detailed prompt builder, visit the{' '}
        <a
          href="https://michaelcurrin.github.io/easy-prompt/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Easy Prompt
        </a>{' '}
        webapp.
      </p>
      <div className="two-pane-layout">
        <div className="input-pane">
          {sections.map((section, index) => (
            <div key={section.title} className="form-group">
              <label htmlFor={`section-${index}`}>{section.title}</label>
              <textarea
                id={`section-${index}`}
                value={section.content}
                onChange={(e) => updateSection(index, e.target.value)}
                placeholder={
                  section.title === 'Goal'
                    ? 'What task you want to complete. e.g. "Create a concise technical summary of the provided research paper, highlighting key findings and methodology."'
                    : section.title === 'Return Format'
                      ? 'The output format e.g. "Return a JSON object with: title (string), key_findings (array of strings), methodology (string), and limitations (array of strings)."'
                      : section.title === 'Warnings'
                        ? 'Tell the model to be careful and pay special attention to certain aspects. e.g. "Maintain scientific accuracy. Do not speculate beyond the paper\'s content. Flag any statistical inconsistencies found."'
                        : 'A few paragraphs of content such as background research or the content to transform with.'
                }
              />
            </div>
          ))}
        </div>

        <div className="preview-section">
          <h2>Preview</h2>
          <div className="preview-container">
            <button
              className="button copy-button"
              onClick={copyToClipboard}
              style={{ minWidth: '120px' }}
            >
              {copyStatus} 📋
            </button>
            <div className="preview">
              <pre>{formattedPrompt || ''}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Renders the root application component.
 */
const App = () => {
  return <PromptBuilder />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

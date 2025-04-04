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
function PromptBuilder() {
  const [sections, setSections] = React.useState([
    { title: 'Goal', content: '' },
    { title: 'Return Format', content: '' },
    { title: 'Warnings', content: '' },
    { title: 'Context Dump', content: '' },
    { title: 'Style and Tone', content: '' },
    { title: 'Sample Output', content: '' },
    { title: 'Evaluation Criteria', content: '' },
  ]);
  const [copyStatus, setCopyStatus] = React.useState('Copy');

  /**
   * Updates a section's content and regenerates the preview.
   *
   * @param {number} index - The index of the section to update
   * @param {string} content - The new content
   */
  function updateSection(index, content) {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], content };
    setSections(newSections);
  }

  /**
   * Generates the formatted prompt from all sections.
   *
   * @returns {string} The formatted prompt text
   */
  function getFormattedPrompt() {
    return sections
      .filter((section) => section.content.trim())
      .map((section) => `## ${section.title}\n${section.content}`)
      .join('\n\n');
  }

  /**
   * Copies the formatted prompt to clipboard.
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
          <h2>Required Inputs</h2>
          <div className="form-group">
            <label htmlFor="section-goal">Goal</label>
            <p>
              Clearly define your objective, such as the desired outcome or the
              question you need answered.{' '}
            </p>
            <textarea
              id="section-goal"
              value={sections[0].content}
              onChange={(e) => updateSection(0, e.target.value)}
              placeholder="e.g. Create a concise technical summary of the provided research paper, highlighting key findings and methodology'"
            />
          </div>

          <div className="form-group">
            <label htmlFor="section-format">Return Format</label>
            <p>Desired format of the output.</p>
            <textarea
              id="section-format"
              value={sections[1].content}
              onChange={(e) => updateSection(1, e.target.value)}
              placeholder={
                'e.g. A bullet list. \ne.g. A short blog post. \ne.g. Return a JSON object with: title (string), key_findings (array of strings), methodology (string), and limitations (array of strings).'
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="section-warnings">Warnings</label>
            <p>
              Tell the model to be careful and pay special attention to certain
              aspects.{' '}
            </p>
            <textarea
              id="section-warnings"
              value={sections[2].content}
              onChange={(e) => updateSection(2, e.target.value)}
              placeholder="e.g. 'Maintain scientific accuracy. Do not speculate beyond the paper's content. Flag any statistical inconsistencies found.'"
            />
          </div>
          <h2>Optional Inputs</h2>

          <div className="form-group">
            <label htmlFor="section-context">Context Dump</label>
            <textarea
              id="section-context"
              value={sections[3].content}
              onChange={(e) => updateSection(3, e.target.value)}
              placeholder="A few paragraphs of content such as background research or the content to transform with."
            />
          </div>
          <div className="form-group">
            <label htmlFor="section-style">Style and Tone</label>
            <p>Specify the desired style and tone for the output.</p>
            <textarea
              id="section-style"
              value={sections[4].content}
              onChange={(e) => updateSection(4, e.target.value)}
              placeholder="e.g. 'Formal and academic. Use technical language appropriate for a professional audience.'"
            />
          </div>

          <div className="form-group">
            <label htmlFor="section-sample-output">Sample Output</label>
            <p>
              Provide an example of the expected output so it can match the
              approach of structure and style.
            </p>
            <textarea
              id="section-sample-output"
              value={sections[5].content}
              onChange={(e) => updateSection(5, e.target.value)}
              placeholder="Paste your existing content here."
            />
          </div>

          <div className="form-group">
            <label htmlFor="section-evaluation-criteria">
              Evaluation Criteria
            </label>
            <p>
              Guide the AI on what to prioritize. e.g. relevance, thoroughness,
              accuracy, format.
            </p>
            <textarea
              id="section-evaluation-criteria"
              value={sections[6].content}
              onChange={(e) => updateSection(6, e.target.value)}
              placeholder={
                'e.g.\n- Relevance to the topic \n- thoroughness in covering all points\n- accuracy of information\n- adherence to the specified format.'
              }
            />
          </div>
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
}

/**
 * Renders the root application component.
 */
function App() {
  return <PromptBuilder />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

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

/**
 * A form component for building structured prompts.
 *
 * @returns {JSX.Element} The PromptBuilder component
 */
function PromptBuilder() {
  const [sections, setSections] = React.useState({
    goal: { title: 'Goal', content: '' },
    returnFormat: { title: 'Return Format', content: '' },
    warnings: { title: 'Warnings', content: '' },
    contextDump: { title: 'Context Dump', content: '' },
    styleAndTone: { title: 'Style and Tone', content: '' },
    sampleOutput: { title: 'Sample Output', content: '' },
    evaluationCriteria: { title: 'Evaluation Criteria', content: '' },
  });
  const [copyStatus, setCopyStatus] = React.useState('Copy');

  /**
   * Updates a section's content and regenerates the preview.
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
          <img src="https://img.shields.io/static/v1?label=MichaelCurrin&amp;message=reasoning-prompt-builder&amp;color=blue&amp;labelColor=35495e&amp;logo=github" alt="MichaelCurrin - reasoning-prompt-builder repo badge" title="Go to MichaelCurrin - reasoning-prompt-builder repo on GitHub" />
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
              value={sections.goal.content}
              onChange={(e) => updateSection('goal', e.target.value)}
              placeholder="e.g. Create a concise technical summary of the provided research paper, highlighting key findings and methodology'"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="section-format">Return Format</label>
            <p>Desired format of the output.</p>
            <textarea
              id="section-format"
              value={sections.returnFormat.content}
              onChange={(e) => updateSection('returnFormat', e.target.value)}
              placeholder={
                'e.g. A bullet list. \ne.g. A short blog post. \ne.g. Return a JSON object with: title (string), key_findings (array of strings), methodology (string), and limitations (array of strings).'
              }
              required
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
              value={sections.warnings.content}
              onChange={(e) => updateSection('warnings', e.target.value)}
              placeholder="e.g. Maintain scientific accuracy. Do not speculate beyond the paper's content. Flag any statistical inconsistencies found."
              required
            />
          </div>
          <h2>Optional Inputs</h2>

          <div className="form-group">
            <label htmlFor="section-context">Context Dump</label>
            <textarea
              id="section-context"
              value={sections.contextDump.content}
              onChange={(e) => updateSection('contextDump', e.target.value)}
              placeholder="A few paragraphs of content such as background research or the content to transform with."
            />
          </div>
          <div className="form-group">
            <label htmlFor="section-style">Style and Tone</label>
            <p>The desired style and tone for the output.</p>
            <textarea
              id="section-style"
              value={sections.styleAndTone.content}
              onChange={(e) => updateSection('styleAndTone', e.target.value)}
              placeholder="e.g. Formal and academic. Use technical language appropriate for a professional audience."
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
              value={sections.sampleOutput.content}
              onChange={(e) => updateSection('sampleOutput', e.target.value)}
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
              value={sections.evaluationCriteria.content}
              onChange={(e) =>
                updateSection('evaluationCriteria', e.target.value)
              }
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

function App() {
  return <PromptBuilder />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

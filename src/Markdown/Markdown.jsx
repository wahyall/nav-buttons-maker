import Prism from "prismjs";
import "./prism.css";

export default function CodeMarkdown({ imgUrl, path, align }) {
  return (
    <div className="code-md" style={{ marginTop: "1.5rem" }}>
      <h6>Markdown Code</h6>
      <pre className="language-md line-numbers">
        <code>{`[<img src="${imgUrl}" align="${align}" />](${path})`.trim()}</code>
      </pre>
    </div>
  );
}

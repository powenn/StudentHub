import { resp } from "../interface/resp";

export default function ResponseDisplay({ response }: { response: resp<string> }) {
    return (
      <div className="response-display">
        <h3>回應結果</h3>
        <p>狀態碼: {response.code}</p>
        <p>訊息: {response.message}</p>
      </div>
    );
  }
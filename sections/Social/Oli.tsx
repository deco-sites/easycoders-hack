/**
 * @title Oli Live Integration
 * @description add your Oli id here
 */
export interface Props {
  /**
   * @title OliID
   */
  oliId: string;
}

export default function Oli({ oliId }: Props) {
  return (
    <>
      <script
        defer
        src="https://sdk.oli.video/oli-sdk.js"
      />
      <script
        defer
        dangerouslySetInnerHTML={{
          __html: `setTimeout(function () {
          oli.init({ id: '${oliId}' });
        }, 1000);`,
        }}
      />
    </>
  );
}

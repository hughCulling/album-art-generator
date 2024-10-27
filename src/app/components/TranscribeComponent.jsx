'use client'
export default function TranscribeComponent() {
    const handleSubmit = async () => {
        console.log("Form submitted!");
    }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="audio/*" />
        <button type="submit">Upload and Transcribe</button>
      </form>
    </>
  );
}

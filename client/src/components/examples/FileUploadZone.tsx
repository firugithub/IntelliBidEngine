import { FileUploadZone } from "../FileUploadZone";

export default function FileUploadZoneExample() {
  return (
    <div className="p-6">
      <FileUploadZone
        title="Upload Requirements Document"
        description="Drag and drop your RFT, BRD, or EPIC documents here or click to browse"
        onFilesChange={(files) => console.log("Files selected:", files)}
      />
    </div>
  );
}

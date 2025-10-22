import { useState } from "react";
import { FileUploadZone } from "@/components/FileUploadZone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export default function UploadPage() {
  const [, setLocation] = useLocation();
  const [requirementsFiles, setRequirementsFiles] = useState<File[]>([]);
  const [proposalFiles, setProposalFiles] = useState<File[]>([]);

  const handleAnalyze = () => {
    console.log("Analyzing files:", { requirementsFiles, proposalFiles });
    // todo: remove mock functionality - Navigate to dashboard after API call
    setLocation("/dashboard");
  };

  const canAnalyze = requirementsFiles.length > 0 && proposalFiles.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-2 rounded-full bg-primary/10 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            AI-Powered Vendor Shortlisting
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your requirements and vendor proposals to get objective,
            transparent shortlisting with role-specific insights
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Requirements Documents</CardTitle>
              <CardDescription>
                Upload your RFT, BRD, EPIC, or other requirement documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploadZone
                title="Drop Requirements Here"
                description="PDF, Word, or Excel files supported"
                onFilesChange={setRequirementsFiles}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vendor Proposals</CardTitle>
              <CardDescription>
                Upload 2-3 vendor or partner proposals for comparison
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploadZone
                title="Drop Proposals Here"
                description="Upload multiple vendor proposals for evaluation"
                onFilesChange={setProposalFiles}
              />
            </CardContent>
          </Card>

          <div className="flex justify-center pt-4">
            <Button
              size="lg"
              onClick={handleAnalyze}
              disabled={!canAnalyze}
              className="gap-2"
              data-testid="button-analyze"
            >
              <Sparkles className="h-5 w-5" />
              Analyze with AI
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          {!canAnalyze && (
            <p className="text-center text-sm text-muted-foreground">
              Upload at least one requirements document and one vendor proposal to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

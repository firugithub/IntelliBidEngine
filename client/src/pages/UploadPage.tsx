import { useState } from "react";
import { FileUploadZone } from "@/components/FileUploadZone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowRight, Loader2, Eye } from "lucide-react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function UploadPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [requirementsFiles, setRequirementsFiles] = useState<File[]>([]);
  const [proposalFiles, setProposalFiles] = useState<File[]>([]);

  const analyzeMutation = useMutation({
    mutationFn: async () => {
      // Create project
      const projectResponse = await apiRequest("POST", "/api/projects", {
        name: "Vendor Evaluation " + new Date().toLocaleDateString(),
      });

      const projectData = await projectResponse.json();
      const projectId = projectData.id;

      // Upload requirements
      const requirementsFormData = new FormData();
      requirementsFiles.forEach((file) => {
        requirementsFormData.append("files", file);
      });

      await fetch(`/api/projects/${projectId}/requirements`, {
        method: "POST",
        body: requirementsFormData,
      });

      // Upload proposals
      const proposalsFormData = new FormData();
      proposalFiles.forEach((file) => {
        proposalsFormData.append("files", file);
      });

      await fetch(`/api/projects/${projectId}/proposals`, {
        method: "POST",
        body: proposalsFormData,
      });

      // Trigger analysis
      await fetch(`/api/projects/${projectId}/analyze`, {
        method: "POST",
      });

      return projectId;
    },
    onSuccess: (projectId) => {
      toast({
        title: "Analysis Complete",
        description: "Your vendor shortlisting report is ready!",
      });
      setLocation(`/dashboard/${projectId}`);
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze documents",
        variant: "destructive",
      });
    },
  });

  const demoMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/seed-sample");
      const data = await response.json();
      return data.projectId;
    },
    onSuccess: (projectId) => {
      toast({
        title: "Demo Loaded",
        description: "Viewing sample evaluation report",
      });
      setLocation(`/dashboard/${projectId}`);
    },
    onError: (error) => {
      toast({
        title: "Demo Failed",
        description: error instanceof Error ? error.message : "Failed to load demo",
        variant: "destructive",
      });
    },
  });

  const handleAnalyze = () => {
    analyzeMutation.mutate();
  };

  const handleViewDemo = () => {
    demoMutation.mutate();
  };

  const canAnalyze = requirementsFiles.length > 0 && proposalFiles.length > 0 && !analyzeMutation.isPending;

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
          <div className="mt-6">
            <Button
              variant="outline"
              onClick={handleViewDemo}
              disabled={demoMutation.isPending}
              className="gap-2"
              data-testid="button-view-demo"
            >
              {demoMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading Demo...
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  View Sample Report
                </>
              )}
            </Button>
          </div>
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
              {analyzeMutation.isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Analyze with AI
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </div>

          {!canAnalyze && !analyzeMutation.isPending && (
            <p className="text-center text-sm text-muted-foreground">
              Upload at least one requirements document and one vendor proposal to continue
            </p>
          )}

          {analyzeMutation.isPending && (
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Parsing documents and running AI analysis...
              </p>
              <p className="text-xs text-muted-foreground">
                This may take 30-60 seconds depending on document size
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

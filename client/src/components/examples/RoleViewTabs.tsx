import { RoleViewTabs } from "../RoleViewTabs";

export default function RoleViewTabsExample() {
  return (
    <div className="p-6">
      <RoleViewTabs
        deliveryInsights={{
          title: "Delivery & PMO Insights",
          items: [
            "Low timeline risk - 8-12 week implementation window achievable",
            "Minimal dependencies on external systems",
            "Team has experience with similar technology stack",
            "Resource allocation within current capacity",
          ],
        }}
        productInsights={{
          title: "Product Insights",
          items: [
            "92% feature coverage of core requirements",
            "Strong alignment with product roadmap for Q2-Q3",
            "Native mobile support for future expansion",
            "Customization options support unique workflows",
          ],
        }}
        architectureInsights={{
          title: "Architecture Insights",
          items: [
            "Fully compliant with enterprise security standards",
            "RESTful API with comprehensive documentation",
            "Low integration complexity - standard OAuth 2.0",
            "Scalable microservices architecture",
          ],
        }}
        engineeringInsights={{
          title: "Engineering & QA Insights",
          items: [
            "Well-documented SDKs for Python, Java, and Node.js",
            "Comprehensive test suite and sandbox environment",
            "Active developer community and support channels",
            "Automated testing capabilities built-in",
          ],
        }}
        procurementInsights={{
          title: "Procurement Insights",
          items: [
            "TCO competitive at $150K-$180K over 3 years",
            "Flexible pricing with volume discounts available",
            "99.9% SLA with historical performance data available",
            "Standard contract terms with minimal legal review needed",
          ],
        }}
      />
    </div>
  );
}

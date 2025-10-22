import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Briefcase,
  Package,
  Layers,
  Code,
  DollarSign,
} from "lucide-react";

interface RoleInsight {
  title: string;
  items: string[];
}

interface RoleViewTabsProps {
  deliveryInsights: RoleInsight;
  productInsights: RoleInsight;
  architectureInsights: RoleInsight;
  engineeringInsights: RoleInsight;
  procurementInsights: RoleInsight;
}

export function RoleViewTabs({
  deliveryInsights,
  productInsights,
  architectureInsights,
  engineeringInsights,
  procurementInsights,
}: RoleViewTabsProps) {
  return (
    <Tabs defaultValue="delivery" className="w-full" data-testid="tabs-role-view">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="delivery" className="flex items-center gap-2" data-testid="tab-delivery">
          <Briefcase className="h-4 w-4" />
          <span className="hidden sm:inline">Delivery</span>
        </TabsTrigger>
        <TabsTrigger value="product" className="flex items-center gap-2" data-testid="tab-product">
          <Package className="h-4 w-4" />
          <span className="hidden sm:inline">Product</span>
        </TabsTrigger>
        <TabsTrigger value="architecture" className="flex items-center gap-2" data-testid="tab-architecture">
          <Layers className="h-4 w-4" />
          <span className="hidden sm:inline">Architecture</span>
        </TabsTrigger>
        <TabsTrigger value="engineering" className="flex items-center gap-2" data-testid="tab-engineering">
          <Code className="h-4 w-4" />
          <span className="hidden sm:inline">Engineering</span>
        </TabsTrigger>
        <TabsTrigger value="procurement" className="flex items-center gap-2" data-testid="tab-procurement">
          <DollarSign className="h-4 w-4" />
          <span className="hidden sm:inline">Procurement</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="delivery" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>{deliveryInsights.title}</CardTitle>
            <CardDescription>Timeline risk, dependencies, and resourcing fit</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {deliveryInsights.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="product" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>{productInsights.title}</CardTitle>
            <CardDescription>Feature coverage and roadmap fit</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {productInsights.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="architecture" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>{architectureInsights.title}</CardTitle>
            <CardDescription>Standards compliance, integration complexity, and security</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {architectureInsights.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="engineering" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>{engineeringInsights.title}</CardTitle>
            <CardDescription>SDKs, APIs, testability, and documentation quality</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {engineeringInsights.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="procurement" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>{procurementInsights.title}</CardTitle>
            <CardDescription>TCO, commercials, and SLA history</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {procurementInsights.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

import { Building2, MapPin, Users, Calendar, ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CompanyCard = ({ company }) => {
  return (
    <Card className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:border-primary/50 bg-card border-border">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              {company.logo}
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                {company.name}
              </h3>
              <Badge variant="secondary" className="mt-1">
                {company.industry}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {company.description}
        </p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{company.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span>{company.employees} employees</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>Founded in {company.founded}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t border-border pt-4">
        <a
          href={`https://${company.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Visit Website</span>
        </a>
      </CardFooter>
    </Card>
  );
};

export default CompanyCard;

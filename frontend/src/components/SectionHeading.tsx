interface SectionHeadingProps {
  tag?: string;
  title: string;
  description?: string;
}

const SectionHeading = ({ tag, title, description }: SectionHeadingProps) => (
  <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
    {tag && (
      <span className="badge-subtle">
        {tag}
      </span>
    )}
    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">{title}</h2>
    {description && <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>}
  </div>
);

export default SectionHeading;

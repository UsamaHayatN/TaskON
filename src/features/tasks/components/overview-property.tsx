interface OverviewPropertyProps {
    label: string;
    children: React.ReactNode;
  }
  
  export const OverviewProperty = ({
    label,
    children,
  }: OverviewPropertyProps) => {
    return (
      <div className="flex items-center gap-x-2">
        <div className="min-w-[100px]">
          <p className="text-[16px]  text-white/70">{label}:</p>
        </div>
        <div className="flex items-center gap-x-2">
            {children}
        </div>
      </div>
    );
  };
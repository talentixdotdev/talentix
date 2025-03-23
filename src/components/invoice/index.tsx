import { TalentixBrandIcon } from "@/components/icons";
import type { Feature } from "@/types/pricing";
import { cn } from "@/utils/classes";
import { useTranslations } from "next-intl";
import type { HTMLAttributes, ReactNode } from "react";


interface InvoiceProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Invoice = ({ children, className, ...props }: InvoiceProps) => {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center gap-8 min-h-screen mx-auto max-w-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

const Header = ({ children, className, ...props }: HeaderProps) => {
  return (
    <header className={cn("inline-flex gap-x-2", className)} {...props}>
      {children || (
        <span className="inline-flex items-center justify-center gap-x-1 text-2xl whitespace-pre font-bold font-mono uppercase">
          <TalentixBrandIcon size={24} strokeWidth={"4"} />
          Talentix
        </span>
      )}
    </header>
  );
};

interface TitleProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  date: string;
}

const Title = ({ title, date, className, ...props }: TitleProps) => {
  return (
    <div 
      className={cn(
        "inline-flex w-full items-center justify-between pb-3 border-b border-dashed border-fg",
        className
      )}
      {...props}
    >
      <span className="text-2xl font-bold">{title}</span>
      <span className="text-xs text-muted-fg">{date}</span>
    </div>
  );
};

interface BodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Body = ({ children, className, ...props }: BodyProps) => {
  return (
    <div 
      className={cn("grid grid-cols-5 gap-y-3 w-full", className)} 
      {...props}
    >
      <h3 className="text-start font-medium text-sm text-fg/80 col-span-4 mb-3">
        Servicio
      </h3>
      <h3 className="text-end font-medium text-sm text-fg/80 mb-3">Precio</h3>
      {children}
    </div>
  );
};

interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  feature?: Feature;
  service?: string;
  price: number;
}

const Item = ({ feature = "basic-support", service, price, className, ...props }: ItemProps) => {
  const t = useTranslations("content.pricing.features")
  return (
    <>
      <div className={cn("font-bold col-span-4", className)} {...props}>
        {t(`${feature}.heading`)}
      </div>
      <div className="font-bold text-end">${price}</div>
    </>
  );
};

interface SubtotalProps extends HTMLAttributes<HTMLDivElement> {
  amount: number;
}

const Subtotal = ({ amount, className, ...props }: SubtotalProps) => {
  return (
    <>
      <div className={cn("font-bold col-span-4 mt-3 text-muted-fg", className)} {...props}>
        Sub total
      </div>
      <div className="font-bold text-end mt-3">${amount}</div>
    </>
  );
};

interface TotalProps extends HTMLAttributes<HTMLDivElement> {
  amount: number;
}

const Total = ({ amount, className, ...props }: TotalProps) => {
  return (
    <>
      <hr className="col-span-5 border-dashed border-muted-fg mt-3 mb-1" />
      <div className={cn("font-bold col-span-4", className)} {...props}>
        Total
      </div>
      <div className="font-bold text-end">${amount}</div>
    </>
  );
};

interface FooterProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

const Footer = ({ children, className, ...props }: FooterProps) => {
  return (
    <footer className={cn("", className)} {...props}>
      {children || (
        <p className="text-xs text-muted-fg text-center">
          Gracias por confiar en nosotros.
        </p>
      )}
    </footer>
  );
};

Invoice.Header = Header;
Invoice.Title = Title;
Invoice.Body = Body;
Invoice.Item = Item;
Invoice.Subtotal = Subtotal;
Invoice.Total = Total;
Invoice.Footer = Footer;

export { Invoice };

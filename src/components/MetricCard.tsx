import { Card, Statistic } from "antd";

interface MetricCardProps {
  title: string;
  value: number;
  unit?: "bps" | "Kbps" | "Mbps" | "Gbps" | "B" | "KB" | "MB" | "GB" | "TB"; // o cualquier otra unidad
  valueFormatter?: (value: number) => string; // Función opcional para formatear el valor
}

const MetricCard = ({ title, value, valueFormatter }: MetricCardProps) => {
  const isValidValue = (value: number | null | undefined): boolean => {
    return value != null && !isNaN(value);
  };

  const formatValue = (value: number): string => {
    if (!isValidValue(value)) {
      return "N/A";
    }

    console.log(value);

    // Si hay un formateador personalizado, lo usamos
    if (valueFormatter) {
      return valueFormatter(value);
    }

    // De lo contrario, lo formateamos con la unidad
    return value.toFixed(2);
  };

  return (
    <Card>
      <Statistic
        valueStyle={{
          fontSize: "3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        title={title}
        value={formatValue(value)}
      />
    </Card>
  );
};

export default MetricCard;

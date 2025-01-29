import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface LineChartProps {
  data: { name: string; value: number }[]
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d")

      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy()
        }

        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: data.map((item) => item.name),
            datasets: [
              {
                label: "Trend Value",
                data: data.map((item) => item.value),
                borderColor: "rgba(59, 130, 246, 1)", // Blue
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                borderWidth: 2,
                fill: true,
                tension: 0.4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: "rgba(255, 255, 255, 0.1)",
                },
                ticks: {
                  color: "rgba(255, 255, 255, 0.7)",
                },
              },
              x: {
                grid: {
                  color: "rgba(255, 255, 255, 0.1)",
                },
                ticks: {
                  color: "rgba(255, 255, 255, 0.7)",
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                titleColor: "rgba(255, 255, 255, 1)",
                bodyColor: "rgba(255, 255, 255, 0.8)",
              },
            },
          },
        })
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return <canvas ref={chartRef} />
}

export default LineChart


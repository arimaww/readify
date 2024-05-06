import { Bar } from 'react-chartjs-2';

type TLineGraph = {
    labels: Array<string> | undefined,
    data: Array<number> | undefined
};

export const BarGraph = ({ labels, data }: TLineGraph) => {
    const lineChartData = {
        labels: labels,
        datasets: [
            {
                label: "Количество продаж",
                data: data,
                backgroundColor: 'rgba(137,0,235, .5)',
            }
        ]
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Название книги'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Количество продаж'
                }
            }
        }
    };
    
    return <Bar options={options} data={lineChartData}></Bar>;
};
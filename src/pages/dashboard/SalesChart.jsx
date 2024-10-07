import { useEffect, useMemo, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';

// third-party
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';

// chart options
const columnChartOptions = {
  chart: {
    type: 'bar',
    height: 430,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '30%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 8,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  },
  yaxis: {
    title: {
      text: '$ (thousands)'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter(val) {
        return `$ ${val} thousands`;
      }
    }
  },
  legend: {
    show: false
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: {
          show: false
        }
      }
    }
  ]
};

// ==============================|| SALES COLUMN CHART ||============================== //

export default function SalesChart({ series1, series2, labels, label1, label2 }) {
  const theme = useTheme();

  const [legend, setLegend] = useState({
    income: true,
    cos: true
  });

  const { income, cos } = legend;

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;

  const [series, setSeries] = useState([]);

  const handleLegendChange = (event) => {
    setLegend({ ...legend, [event.target.name]: event.target.checked });
  };

  const xsDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [options, setOptions] = useState(columnChartOptions);

  useEffect(() => {
    if (income && cos) {
      setSeries([series1, series2]);
    } else if (income) {
      setSeries(series1);
    } else if (cos) {
      setSeries(series2);
    } else {
      setSeries([]);
    }
  }, [income, cos, series1, series2]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: !(income && cos) && cos ? [primaryMain] : [warning, primaryMain],
      xaxis: {
        categories: labels,
        labels: {
          style: {
            colors: labels.map(() => secondary)
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      plotOptions: {
        bar: {
          columnWidth: xsDown ? '60%' : '30%'
        }
      }
    }));
  }, [primary, secondary, line, warning, primaryMain, successDark, income, cos, xsDown, labels]);

  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box sx={{ p: 2.5, pb: 0 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack spacing={1.5}>
            <Typography variant="h6" color="secondary"></Typography>
            <Typography variant="h4"></Typography>
          </Stack>
          <FormControl component="fieldset">
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox color="warning" checked={income} onChange={handleLegendChange} name="income" />}
                label={label1}
              />
              <FormControlLabel control={<Checkbox checked={cos} onChange={handleLegendChange} name="cos" />} label={label2} />
            </FormGroup>
          </FormControl>
        </Stack>
        <Box id="chart" sx={{ bgcolor: 'transparent' }}>
          <ReactApexChart options={options} series={series} type="bar" height={360} />
        </Box>
      </Box>
    </MainCard>
  );
}

SalesChart.propTypes = {
  series1: PropTypes.object,
  series2: PropTypes.object,
  labels: PropTypes.array,
  label1: PropTypes.string,
  label2: PropTypes.string
};

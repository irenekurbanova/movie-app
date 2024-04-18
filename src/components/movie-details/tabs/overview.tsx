import { getStringFromArray, USDollar } from "@/utilities/helpers";
import { TabPanel } from "@mui/lab";
import { Typography, Table, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { OverviewTabProps } from "./types";

const OverviewTab = ({
  overview,
  production_countries,
  production_companies,
  release_date,
  genres,
  budget,
  revenue,
  runtime,
}: OverviewTabProps) => {
  const genresList = getStringFromArray(genres);
  const countryList = getStringFromArray(production_countries);
  const companiesList = getStringFromArray(production_companies);

  return (
    <TabPanel value="1" sx={{ paddingX: 0, paddingY: 2 }}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography>{overview}</Typography>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Страна</TableCell>
              <TableCell>{countryList}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Студия</TableCell>
              <TableCell>{companiesList}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Дата релиза</TableCell>
              <TableCell>{release_date}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Жанр</TableCell>
              <TableCell>{genresList}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Бюджет</TableCell>
              <TableCell>{budget === 0 ? "N/A" : USDollar.format(budget)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Сборы</TableCell>
              <TableCell>{revenue === 0 ? "N/A" : USDollar.format(revenue)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Продолжительность</TableCell>
              <TableCell>{runtime} мин.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </TabPanel>
  );
};

export default OverviewTab;

export function useCalcDate() {
  function differenceInYears(date1: string, date2: string): number {
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();

    // Calcula a diferença em anos
    const yearDifference = endYear - startYear;

    return yearDifference;
  }

  function differenceInMonths(date1: string, date2: string): number {
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();

    // Calcula a diferença em anos e meses
    const yearDifference = endYear - startYear;
    const monthDifference = endMonth - startMonth;

    // Calcula a diferença total em meses
    const totalMonthsDifference = yearDifference * 12 + monthDifference;

    return totalMonthsDifference;
  }

  function differenceInWeeks(date1: string, date2: string): number {
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    // Calcula a diferença em milissegundos
    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();

    // Converte a diferença de milissegundos para semanas
    const differenceInWeeks =
      differenceInMilliseconds / (1000 * 60 * 60 * 24 * 7);

    return Math.floor(differenceInWeeks);
  }

  function differenceInDays(date1: string, date2: string): number {
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    // Calcula a diferença em milissegundos
    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();

    // Converte a diferença de milissegundos para dias
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    return Math.floor(differenceInDays);
  }

  function differenceInHours(date1: string, date2: string): number {
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    // Calcula a diferença em milissegundos
    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();

    // Converte a diferença de milissegundos para horas
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

    return Math.floor(differenceInHours);
  }

  function differenceInMinutes(date1: string, date2: string): number {
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    // Calcula a diferença em milissegundos
    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();

    // Converte a diferença de milissegundos para minutos
    const differenceInMinutes = differenceInMilliseconds / (1000 * 60);

    return Math.floor(differenceInMinutes);
  }

  function differenceInSeconds(date1: string, date2: string): number {
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    // Calcula a diferença em milissegundos
    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();

    // Converte a diferença de milissegundos para segundos
    const differenceInSeconds = differenceInMilliseconds / 1000;

    return Math.floor(differenceInSeconds);
  }

  return {
    differenceInYears,
    differenceInMonths,
    differenceInWeeks,
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInSeconds,
  };
}

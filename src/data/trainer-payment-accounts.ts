// Реальные ID тренеров из API
export const trainerPaymentAccounts: Record<string, string> = {
  // ХУДОЖЕСТВЕННАЯ ГИМНАСТИКА (старые)
  cmmx50m7t00024hca2sbp00yu: "15-12",
  cmmx50m7y00034hcafvd6ldy5: "16-8",
  cmmx50m8100044hcamvuox7hk: "13-12",
  cmmx50m8300054hcagtduulpx: "14-12",

  // ХУДОЖЕСТВЕННАЯ ГИМНАСТИКА (НОВЫЕ)
  cmnokfouq0002yecammxcyhw1: "12-8",
  cmnokgcgo0003yecaizbc33wy: "11-8",
  cmnokgs7j0004yecaspgl3tmu: "16-8",
  cmnokh8jj0005yeca5fs3tby3: "17-8",

  // КИКБОКСИНГ
  cmmx50m95000b4hca9y7u0vtu: "33-12",
  cmmx50m9a000c4hcay2miozjw: "32-12",
  cmmx50m9d000d4hca1aqfacyd: "31-12",

  // ДЗЮДО
  cmmx50mao000l4hcae87k5qcz: "71-12",
  cmmx50mar000m4hcavlyesln5: "71-12",

  // ВЬЕТ ВО ДАО / ЙОГА
  cmmx50ma2000h4hcacewusuzi: "21-12",
  cmmx50mb9000o4hcarafw601o: "21-12",

  // СТРЕЛЬБА
  cmmx50mbr000r4hcat3d2hnba: "81-8",
  cmmx50mbx000s4hcaamn29ehg: "81-8",
  cmmx50mbz000t4hcaaprbz6e2: "81-8",
  cmmx50mc2000u4hca9nexykmh: "81-8",
  cmnojaca70000yeca93ll1gae: "81-8",

  // ТАНЦЫ
  cmnojzz0r0001yecafo80lyc8: "51-8",

  // ФРИСТАЙЛ
  cmmx50mdo000z4hca4vly6vxc: "41-8",
  cmmx50mdr00104hca0g3pkp32: "41-8",

  // ПОЖАРНО-СПАСАТЕЛЬНЫЙ СПОРТ
  cmmx50me300124hcavt5xib6m: "61-8",
};

export function getPaymentAccount(trainerId: string): string | null {
  return trainerPaymentAccounts[trainerId] || null;
}

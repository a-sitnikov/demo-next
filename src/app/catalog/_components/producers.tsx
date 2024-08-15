"use client";

import { useTranslation } from "@/i18n/client";
import { mockProducers } from "@/mock-data/producers";
import { List } from "@/ui/list";

export const Producers = () => {
  const { t } = useTranslation("catalog");

  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-medium">{t("filters.producer")}</h4>
      <List items={mockProducers} />
    </div>
  );
};

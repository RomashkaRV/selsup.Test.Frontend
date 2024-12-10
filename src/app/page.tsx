"use client";

import React, { useState, useEffect, FC } from "react";

interface Param {
  id: number;
  name: string;
  type: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: string[];
}

interface Props {
  params: Param[];
  model: Model;
}

// Заменил классовый компонента ParamEditor на функциональный для модернизацим.
// Проще, компактнее и легче расширяются благодаря хукам

const ParamEditor: FC<Props> = ({ params, model }) => {
  const [paramValues, setParamValues] = useState<ParamValue[]>([]);

  useEffect(() => {
    const initializeParamValues = () =>
      params.map((param) => {
        const existingValue = model.paramValues.find((prev) => prev.paramId === param.id);
        return {
          paramId: param.id,
          value: existingValue?.value || "",
        };
      });

    setParamValues(initializeParamValues());
  }, [params, model]);

  const handleInputChange = (paramId: number, value: string) => {
    setParamValues((prevValues) =>
      prevValues.map((prev) =>
        prev.paramId === paramId && prev.value !== value ? { ...prev, value } : prev
      )
    );
  };

  const getModel = (): Model => ({
    paramValues,
    colors: model.colors,
  });

  return (
    <div>
      <form>
        {params.map((param) => (
          <div key={param.id}>
            <label htmlFor={`param-${param.id}`}>{param.name}:</label>
            <input
              id={`param-${param.id}`}
              type="text"
              value={paramValues.find((prev) => prev.paramId === param.id)?.value || ""}
              onChange={(e) => handleInputChange(param.id, e.target.value)}
            />
          </div>
        ))}
      </form>
      <button onClick={() => console.log("Updated Model:", getModel())}>
        Сохранить
      </button>
    </div>
  );
};

const params: Param[] = [
  { id: 1, name: "Назначение", type: "string" },
  { id: 2, name: "Длина", type: "string" },
];

const model: Model = {
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" },
  ],
  colors: [],
};

const App: FC = () => {
  return (
    <div>
      <ParamEditor params={params} model={model} />
    </div>
  );
};

export default App;

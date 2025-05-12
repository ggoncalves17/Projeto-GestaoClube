import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ptLocale from "@fullcalendar/core/locales/pt";

const Calendario = ({ eventos }) => {
  const [jogoSelecionado, setJogoSelecionado] = useState(null);

  let todosEventos;

  if (eventos != null) {
    todosEventos = eventos.map((evento) => ({
      id: evento.id,
      title: `vs ${evento.adversario} (${(evento.localizacao).substr(0,1)})`,
      start: `${evento.data}T${evento.hora}`,
      extendedProps: {
        resultado: evento.resultado,
        resultadoFinal: evento.resultado_final,
        competicao: evento.competicao,
        estado: evento.estado,
      },
    }));
  } else {
    todosEventos = null;
  }

  const handleSelecionaEvento = (info) => {
    setJogoSelecionado({
      titulo: info.event.title,
      data: info.event.start.toLocaleDateString(),
      hora: info.event.start.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      ...info.event.extendedProps,
    });
  };

  return (
    <div>
      <style>
        {`
          .fc-event {
            cursor: pointer;
          }
        `}
      </style>

      <FullCalendar
        locale={ptLocale}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={todosEventos}
        height="auto"
        eventClick={handleSelecionaEvento}
        headerToolbar={{
          left: "",
          center: "title",
        }}
      />

      {jogoSelecionado && (
        <div>
          <p>Teste</p>
          <button onClick={() => setJogoSelecionado(null)}>Fechar</button>
        </div>
      )}
    </div>
  );
};

export default Calendario;

import currencyUI from './currency';

class TicketsUI {
    constructor(currency) {
        this.container = document.querySelector('.tickets-section .row');
        this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
    }
    renderTickets(tickets) {
        this.clearContainer();

        if (!tickets.length) {
            this.showEmptyMsg();
            return;
        }

        let fragment = '';
        const currency = this.getCurrencySymbol();

        tickets.forEach(ticket => {
            const template = TicketsUI.ticketTemplate(ticket, currency);
            fragment += template;
        });
        this.container.insertAdjacentHTML('afterbegin', fragment);
    }

    clearContainer() {
        this.container.innerHTML = '';
    }

    showEmptyMsg() {
        const template = TicketsUI.emptyMsgTemplate();
        this.container.insertAdjacentHTML('afterbegin', template);
    }

    static emptyMsgTemplate() {
        return `
        <div class="alert d-flex">
        <span class="alert-text">По вашему запросу билетов не найдено</span>
      </div>
        `;
    }

    static ticketTemplate(ticket, currency) {
        return `
        <div class="col s12 m6">
        <div class="card ">
          <div class="tickets card-content ">
            <div class="tickets-header d-flex">
              <div class="tickets-logo">
                <img class="tickets-img" src="${ticket.airline_logo}" alt="">
              </div>
              <span class="card-title">${ticket.airline_name}</span>
            </div>
            <div class="tickets-cities d-flex">
              <div class="tickets-depart-city d-flex">
                <span>${ticket.origin_name}</span>
                <div class="city-logo">
                  <i class="small material-icons">flight_takeoff</i>
                </div>
              </div>
              <div class="tickets-return-city d-flex">
                <div class="city-logo">
                  <i class="small material-icons">flight_land</i>
                </div>
                <span>${ticket.destination_name}</span>
              </div>
            </div>
            <div class="tickets-footer">
              <div class="d-flex">
                <div class="tickets-date">
                  <span>${ticket.departure_at}</span>
                </div>
                <div class="tickets-price">
                  <span>${currency}${ticket.price}</span>
                </div>
              </div>
              <div class="tickets-number-flight">
                <span>Пересадок: ${ticket.transfers} Номер рейса: ${ticket.flight_number}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
        `;
    }
}

const ticketsUI = new TicketsUI(currencyUI);

export default ticketsUI;



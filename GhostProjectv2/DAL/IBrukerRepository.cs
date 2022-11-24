﻿using GhostProjectv2.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GhostProjectv2.DAL
{
    public interface IBrukerRepository
    {
        Task<bool> Lagre(Bruker innBruker);
        Task<List<Bruker>> HentAlle();
        Task<bool> Slett(int id);
        Task<Bruker> HentEn(int id);
        Task<bool> Endre(Bruker endreBruker);
        Task<bool> LoggInn(Kunde innKunde);
        Task<Bruker> HentKundeId(Kunde innKunde);
        Task<bool> EndreSaldo(Bruker innBruker);
    }
}

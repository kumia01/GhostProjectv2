﻿using System;
using System.ComponentModel.DataAnnotations;

namespace GhostProjectv2.Models
{
    public class Bruker
    {
        public int Id { get; set; }
        [RegularExpression(@"[a-zA-ZæøåÆØÅ. \-]{1,20}$")]
        public string Fornavn { get; set; }
        [RegularExpression(@"[a-zA-ZæøåÆØÅ. \-]{1,35}$")]
        public string Etternavn { get; set; }
        [RegularExpression(@"[0-9a-zA-ZæøåÆØÅ. \-]{1,50}$")]
        public string Adresse { get; set; }
        [RegularExpression(@"[0-9]{4}$")]
        public string Postnr { get; set; }
        [RegularExpression(@"[a-zA-ZæøåÆØÅ. \-]{1,20}$")]
        public string Poststed { get; set; }
        [RegularExpression(@"^[0-9a-zA-ZæøåÆØÅ. \-]{2,20}$")]
        public String Brukernavn { get; set; }
        [RegularExpression(@"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$")]
        public String Passord { get; set; }
    }
}

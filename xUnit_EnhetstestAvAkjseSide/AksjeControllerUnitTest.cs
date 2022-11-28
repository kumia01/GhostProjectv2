﻿using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using GhostProjectv2.Controllers;
using GhostProjectv2.DAL;
using GhostProjectv2.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;


namespace xUnit_EnhetstestAvAkjseSide
{
    public class AksjeControllerUnitTest
    {
        private const string _loggetInn = "loggetInn";
        private const string _ikkeLoggetInn = "";

        private readonly Mock<IAksjeRepository> mockRep = new Mock<IAksjeRepository>();
        private readonly Mock<ILogger<AksjeController>> mockLog = new Mock<ILogger<AksjeController>>();

        private readonly Mock<HttpContext> mockHttpContext = new Mock<HttpContext>();
        private readonly MockHttpSession mockSession = new MockHttpSession();



        [Fact]
        public async Task HentAlleOK()
        {
            //Arrange
            var aksje1 = new Aksje { Id = 1, Ticker = "TRAB", Selskap = "Trabanzospor", Pris = 10, gammelPris = 20 };
            var aksje2 = new Aksje { Id = 2, Ticker = "LSK", Selskap = "Lillestrøm Sportsklubb", Pris = 6900, gammelPris = 68 };
            var aksje3 = new Aksje { Id = 3, Ticker = "GOBA", Selskap = "GoBastards", Pris = 1, gammelPris = 2 };

            var aksjeList = new List<Aksje>();
            aksjeList.Add(aksje1);
            aksjeList.Add(aksje2);
            aksjeList.Add(aksje3);

            mockRep.Setup(k => k.HentAlle()).ReturnsAsync(aksjeList);

            var aksjeController = new AksjeController(mockRep.Object, mockLog.Object);

            //Act
            var resultat = await aksjeController.HentAlle() as OkObjectResult;

            //Assert
            Assert.Equal<List<Aksje>>((List<Aksje>)resultat.Value, aksjeList);
        }

        [Fact]
        public async Task HentEnOK()
        {

        }
    }
}
